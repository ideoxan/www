import File from "app/components/Editor/Activities/Workspace/File.jsx"
import Folder from "app/components/Editor/Activities/Workspace/Folder.jsx"
import { useEffect, useState } from "react"

export default function EditorActivityWorkspace({
    metadata,
    fs,
    openCodeTabs,
    setOpenCodeTabs,
    activeCodeTab,
    setActiveCodeTab,
    ...props
}) {
    const [files, setFiles] = useState([])

    useEffect(() => {
        ;(async () => {
            setFiles((await fs.tree({ dirPath: "/" })).children)
        })()
    }, [fs])

    return (
        <>
            <h2 className="text-left font-sans text-xs font-bold text-gray-50">Workspace</h2>
            <ul className="my-3 flex flex-col">
                {files.map(file => {
                    if (file.type === "file") {
                        return (
                            <File
                                key={file.object_id}
                                file={file}
                                openCodeTabs={openCodeTabs}
                                setOpenCodeTabs={setOpenCodeTabs}
                                activeCodeTab={activeCodeTab}
                                setActiveCodeTab={setActiveCodeTab}
                            />
                        )
                    } else {
                        return (
                            <Folder
                                key={file.object_id}
                                file={file}
                                openCodeTabs={openCodeTabs}
                                setOpenCodeTabs={setOpenCodeTabs}
                                activeCodeTab={activeCodeTab}
                                setActiveCodeTab={setActiveCodeTab}
                            />
                        )
                    }
                })}
            </ul>
        </>
    )
}
