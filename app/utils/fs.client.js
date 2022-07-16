import Dexie from "dexie"
import { v4 as uuidv4 } from "uuid"
import { getType } from "mime"

export default class FileSystem {
    // TODO: export path helper class
    constructor ({ fsName }) {
        // Create a new Dexie database
        this._db = new Dexie("ix-fs")
        // Create a table for the files
        this.stores = {}
        this.currentStore = fsName
        this.stores[this.currentStore] = "&object_id, &path, mime, type, modified, content"
    }

    async init() {
        this._db.version(1).stores(this.stores)
        this._db.on("ready", () => {
            console.log("[FileSystem] Info: Online. Ready.")
        })
        this._db.on("versionchange", async (e) => {
            e.preventDefault()
            console.log(`[FileSystem] Warn: Version differs (${ e.oldVersion } vs ${ e.newVersion }).`)
            console.log(`[FileSystem] Warn: Discarding old FileSystem data in favor of new one.`)
            console.log(`[FileSystem] Warn: This process is irreversible!`)
            await this._db.table(this.currentStore).clear()
            return this.init()
        })
    }

    // Write a file to the filesystem
    async writeFile({ filePath, content }) {
        // Set the contents of the file
        try {
            console.log(`[FileSystem] Info: Writing file: ${ filePath }`)
            if (await this._db.table(this.currentStore).get({ path: filePath })) {

                await this._db.table(this.currentStore).update(filePath, {
                    content: content,
                    modified: new Date(),
                })

            } else {
                let object_id = uuidv4()
                let folders = filePath.split("/")
                folders.pop()
                await this.mkdir({ dirPath: folders.join("/") })
                await this._db.table(this.currentStore).add({
                    object_id,
                    path: filePath,
                    mime: getType(filePath),
                    type: "file",
                    modified: new Date(),
                    content: content,
                })
            }
        } catch (e) {
            console.error(`[FileSystem] Error: Failed to write file: ${ filePath }`)
            console.error(e)
        }
    }

    // Remove a file from the filesystem
    async removeFile({ filePath }) {
        try {
            console.log(`[FileSystem] Info: Removing file: ${ filePath }`)
            await this._db.table(this.currentStore).delete(filePath)
        } catch (e) {
            console.error(`[FileSystem] Error: Failed to remove file: ${ filePath }`)
            console.error(e)
        }
    }

    // Read a file from the filesystem
    async readFile({ filePath }) {
        try {
            console.log(`[FileSystem] Info: Reading file: ${ filePath }`)
            const file = await this._db.table(this.currentStore).get({ path: filePath })
            return file.content
        } catch (e) {
            console.error(`[FileSystem] Error: Failed to read file: ${ filePath }`)
            console.error(e)
        }
    }

    // Get file info from the filesystem
    async stat({ filePath }) {
        try {
            console.log(`[FileSystem] Info: Stating file: ${ filePath }`)
            const {
                object_id,
                path,
                mime,
                type,
                modified
            } = await this._db.table(this.currentStore).get({ path: filePath })
            return {
                object_id,
                path,
                mime,
                type,
                modified
            }
        } catch (e) {
            console.error(`[FileSystem] Error: Failed to stat file: ${ filePath }`)
            console.error(e)
        }
    }

    // Get a list of files from the filesystem
    async ls({ dirPath }) {
        if (this._db.table(this.currentStore).get({ path: dirPath })) {
            console.log(`[FileSystem] Info: Listing direcotry: ${ dirPath }`)
            let pathSplitCount = dirPath.split("/").length
            return this._db.table(this.currentStore)
                .where("path")
                .startsWith(dirPath)
                .filter((file) => {
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
        }
        return null
    }

    // Create new directory in the filesystem
    async mkdir({ dirPath }) {
        let folders = dirPath.split("/")
        // mkdir operation
        let currentPath = ""
        for (let i = 0; i < folders.length; i++) {
            currentPath += folders[i] + "/"
            if (!await this._db.table(this.currentStore).get({ path: currentPath })) {
                console.log(`[FileSystem] Info: Creating direcotry: ${ currentPath }`)
                await this._db.table(this.currentStore).add({
                    object_id: uuidv4(),
                    path: currentPath,
                    mime: null,
                    type: "directory",
                    modified: new Date(),
                    content: null
                })
            }
        }
    }

    // Tree method that generates a JSON tree of the filesystem recursively
    async tree({ dirPath }) {
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

    // TODO: JSON tree to tarball conversion
    async packfs({ dirPath }) {
        console.log(`[FileSystem] Warn: pack fs operation not implemented.`)
        return null
    }
}
