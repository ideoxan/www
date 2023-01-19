import Dexie from "dexie"
import { v4 as uuidv4 } from "uuid"
import { getType } from "mime"
import tarball from "app/utils/tarball.client"

const FS_DB_NAME = "fs-ix"
const FS_DB_VERSION = 1
const FS_DB_TABLE_NAME = "files"
// -1 = No logging
// 0 = Errors only
// 1 = Errors and warnings
// 2 = Errors, warnings, and info
const FS_DEBUG_LOGLEVEL = 0

let db = null
createIfNull()

function createIfNull() {
    if (
        db == null ||
        !(db instanceof Dexie) ||
        db.table(FS_DB_TABLE_NAME) == null ||
        typeof db?.table(FS_DB_TABLE_NAME) == "undefined"
    ) {
        // Create a new Dexie database
        db = new Dexie(FS_DB_NAME)

        // Listen for events
        db.on("ready", () => {
            debugLog(2, "[FileSystem] Info: Online. Ready.")
        })
        db.on("versionchange", async e => {
            e.preventDefault()
            debugLog(1, `[FileSystem] Warn: Version differs (${e.oldVersion} vs ${e.newVersion}).`)
            debugLog(1, `[FileSystem] Warn: Discarding old FileSystem data in favor of new one.`)
            debugLog(1, `[FileSystem] Warn: This process is irreversible!`)
            await db.table(FS_DB_TABLE_NAME).clear()
            return createIfNull()
        })

        // Create a table for the files
        db.version(FS_DB_VERSION).stores({
            [FS_DB_TABLE_NAME]: "&object_id, &path, mime, type, modified, content",
        })
    }
}

function debugLog(level, message) {
    if (FS_DEBUG_LOGLEVEL >= level) console.log(message)
}

export default class FileSystem {
    // TODO: export path helper class
    // Write a file to the filesystem
    static async writeFile({ filePath, content }) {
        // Set the contents of the file
        try {
            createIfNull()
            debugLog(2, `[FileSystem] Info: Writing file: ${filePath}`)
            if (await db.table(FS_DB_TABLE_NAME).get({ path: filePath })) {
                await db.table(FS_DB_TABLE_NAME).update(filePath, {
                    content: content,
                    modified: new Date(),
                })
            } else {
                let object_id = uuidv4()
                let folders = filePath.split("/")
                folders.pop()
                await this.mkdir({ dirPath: folders.join("/") })
                await db.table(FS_DB_TABLE_NAME).add({
                    object_id,
                    path: filePath,
                    mime: getType(filePath),
                    type: "file",
                    modified: new Date(),
                    content: content,
                })
            }
        } catch (e) {
            console.error(`[FileSystem] Error: Failed to write file: ${filePath}`)
            console.error(e)
        }
    }

    // Remove a file from the filesystem
    static async removeFile({ filePath }) {
        try {
            createIfNull()
            debugLog(2, `[FileSystem] Info: Removing file: ${filePath}`)
            await db.table(FS_DB_TABLE_NAME).delete(filePath)
        } catch (e) {
            console.error(`[FileSystem] Error: Failed to remove file: ${filePath}`)
            console.error(e)
        }
    }

    // Read a file from the filesystem
    static async readFile({ filePath }) {
        try {
            createIfNull()
            debugLog(2, `[FileSystem] Info: Reading file: ${filePath}`)
            const file = await db.table(FS_DB_TABLE_NAME).get({ path: filePath })
            return file.content
        } catch (e) {
            console.error(`[FileSystem] Error: Failed to read file: ${filePath}`)
            console.error(e)
        }
    }

    // Get file info from the filesystem
    static async stat({ filePath }) {
        try {
            createIfNull()
            debugLog(2, `[FileSystem] Info: Stating file: ${filePath}`)
            const { object_id, path, mime, type, modified } = await db
                .table(FS_DB_TABLE_NAME)
                .get({ path: filePath })
            return {
                object_id,
                path,
                mime,
                type,
                modified,
            }
        } catch (e) {
            console.error(`[FileSystem] Error: Failed to stat file: ${filePath}`)
            console.error(e)
        }
    }

    // Get a list of files from the filesystem
    static async ls({ dirPath }) {
        createIfNull()
        if (db.table(FS_DB_TABLE_NAME).get({ path: dirPath })) {
            debugLog(2, `[FileSystem] Info: Listing direcotry: ${dirPath}`)
            let pathSplitCount = dirPath.split("/").length
            return (
                db
                    .table(FS_DB_TABLE_NAME)
                    .where("path")
                    .startsWith(dirPath)
                    .filter(file => {
                        // Split up the path and count the number of folders included
                        let fileSplitPath = file.path.split("/")
                        // Filter out the current directory
                        if (file.path == dirPath) return false
                        // Filter out subdirectories outside with depth greater than 1
                        if (fileSplitPath.length <= pathSplitCount + 1) {
                            // Make sure folders are included, but none of their children
                            if (fileSplitPath.length == pathSplitCount + 1) {
                                return fileSplitPath[pathSplitCount] == ""
                            } else return true
                        } else return false
                    })
                    .toArray() || []
            )
        }
        return null
    }

    // Create new directory in the filesystem
    static async mkdir({ dirPath }) {
        createIfNull()
        let folders = dirPath.split("/")
        // mkdir operation
        let currentPath = ""
        for (let i = 0; i < folders.length; i++) {
            currentPath += folders[i] + "/"
            if (!(await db.table(FS_DB_TABLE_NAME).get({ path: currentPath }))) {
                debugLog(2, `[FileSystem] Info: Creating direcotry: ${currentPath}`)
                await db.table(FS_DB_TABLE_NAME).add({
                    object_id: uuidv4(),
                    path: currentPath,
                    mime: null,
                    type: "directory",
                    modified: new Date(),
                    content: null,
                })
            }
        }
    }

    // Tree method that generates a JSON tree of the filesystem recursively
    static async tree({ dirPath }) {
        createIfNull()
        let tree = await this.stat({ filePath: dirPath })
        let files = await this.ls({ dirPath })
        if (tree.type === "directory") {
            tree.children = []
            for (let file of files) {
                tree.children.push(await this.tree({ dirPath: file.path }))
            }
        }
        return tree
    }

    // Convert the files listed in the JSON tree to a tarball
    static async pack({ dirPath }) {
        createIfNull()
        debugLog(2, `[FileSystem] Info: Tarballing FS: ${dirPath}`)

        let tar = new tarball.TarWriter()
        let tree = await this.tree({ dirPath })

        let traverse = async tree => {
            if (tree.type === "directory") {
                tar.addFolder(tree.path)
                for (let child of tree.children) {
                    await traverse(child)
                }
            } else {
                let fileContent = await this.readFile({ filePath: tree.path })
                tar.addFile(tree.path, new File([fileContent], tree.path.split("/").pop()))
            }
        }

        await traverse(tree, tree.path)
        return await tar.writeBlob()
    }

    // Unpack a tarball into the filesystem
    static async unpack({ dirPath, tarFile }) {
        createIfNull()
        debugLog(1, `[FileSystem] Info: Unpacking tarball at: ${dirPath}`)
        debugLog(1, `[FileSystem] Warn: This will overwrite the filesystem at this path!`)
        debugLog(1, `[FileSystem] Warn: This process is irreversible!`)

        // Purge the filesystem recursively at this path
        let purge = async dirPath => {
            let files = await this.ls({ dirPath })
            for (let file of files) {
                if (file.type === "directory") {
                    await purge(file.path)
                } else {
                    await this.removeFile({ filePath: file.path })
                }
            }
            await this.removeFile({ filePath: dirPath })
        }
        await purge(dirPath)

        // Unpack the tarball
        let tar = new tarball.TarReader()
        let data = await tar.readFile(new File([tarFile], "workspace.tar"))
        for (let file of data) {
            if (file.type === "file") {
                await this.writeFile({
                    filePath: "/" + file.name,
                    content: tar.getTextFile(file.name),
                })
            }
        }
    }
}
