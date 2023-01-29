import File from "app/components/LearnApp/Editor/ActivitiesSidebar/Workspace/File"
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
        <li className="group flex h-max w-full flex-col">
            <div
                className="flex h-max w-full cursor-pointer flex-row rounded-md py-2 px-3 opacity-70 hover:bg-gray-800 hover:opacity-90"
                onClick={() => {
                    setShowChildren(!showChildren)
                }}>
                <Icon
                    name="Folder"
                    width={3}
                    height={3}
                    color="gray-50"
                    strokeThickness={2}
                    className="my-auto"
                />
                <p className="ml-2 truncate text-left font-sans text-xs font-medium text-gray-50">
                    {folderName.pop()}
                </p>
                <Icon
                    name={showChildren ? "ChevronDown" : "ChevronLeft"}
                    width={3}
                    height={3}
                    color="gray-50"
                    strokeThickness={2}
                    className="my-auto ml-auto opacity-50 group-hover:opacity-100"
                />
            </div>
            {showChildren && (
                <ul className="ml-4 flex flex-col">
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
