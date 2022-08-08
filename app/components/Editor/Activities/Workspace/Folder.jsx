import File from "app/components/Editor/Activities/Workspace/File.jsx"
import Icon from "app/components/Icon"
import { useState } from "react"

export default function Folder({
    file,
    openCodeTabs,
    setOpenCodeTabs,
    activeCodeTab,
    setActiveCodeTab,
    ...props
}) {
    const [showChildren, setShowChildren] = useState(false)

    const folderName = file.path.split("/")
    folderName.pop()

    return (
        <li className="group flex flex-col w-full h-max">
            <div
                className="flex flex-row py-2 px-3 rounded-md hover:bg-gray-800 w-full h-max cursor-pointer opacity-70 hover:opacity-90"
                onClick={() => {
                    setShowChildren(!showChildren)
                }}
            >
                <Icon
                    name="Folder"
                    width={3}
                    height={3}
                    color="gray-50"
                    strokeThickness={2}
                    className="my-auto"
                />
                <p className="font-sans font-medium text-xs text-left text-gray-50 ml-2 truncate">
                    {folderName.pop()}
                </p>
                <Icon
                    name={showChildren ? "ChevronDown" : "ChevronLeft"}
                    width={3}
                    height={3}
                    color="gray-50"
                    strokeThickness={2}
                    className="ml-auto my-auto opacity-50 group-hover:opacity-100"
                />
            </div>
            {showChildren && (
                <ul className="flex flex-col ml-4">
                    {file.children.map(file => {
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
            )}
        </li>
    )
}
