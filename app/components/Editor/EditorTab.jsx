import Icon from "app/components/Icon"

export default function EditorTab({
    active = false,
    FileTypeIconName = null,
    fileTypeIconColor = "#fff",
    label = "New Tab",
    closeHandler = null,
    canBeClosed = true,
    ...props
}) {
    let defaultClassNames = "flex flex-row flex-grow-0 flex-shrink-0 w-48 h-max pl-4 pr-2 py-2 mr-2 rounded-lg border-2 border-primary bg-gray-700 cursor-pointer "
    let activeClassNames = "border-opacity-100 bg-opacity-100 opacity-100"
    let inactiveClassNames = "border-opacity-0 bg-opacity-0 opacity-50"

    let fallbackIconName = null
    if (!FileTypeIconName) {
        switch (label) {
            case "Preview":
                fallbackIconName = "Monitor"
                break
            case "Console":
                fallbackIconName = "Terminal"
                break
            case "Lesson Guide":
                fallbackIconName = "FileText"
                break
            default:
                fallbackIconName = "File"
        }
    }

    return (
        <div className={defaultClassNames + (active ? activeClassNames : inactiveClassNames)} {...props}>
            {FileTypeIconName ? (
                <FileTypeIconName className="w-3 h-3 my-auto" color={fileTypeIconColor} />
            ) : (
                <Icon
                    name={fallbackIconName}
                    width={3}
                    height={3}
                    className="my-auto text-gray-50"
                />
            )}
            <p className="ml-3 font-sans font-medium text-xs text-left text-gray-50">{label}</p>
            {canBeClosed && (
                <button className="ml-auto my-auto text-gray-50 opacity-50 hover:opacity-100" onClick={typeof closeHandler === "function" && closeHandler}>
                    <Icon
                        name="X"
                        width={3}
                        height={3}
                        className="ml-auto"
                    />
                </button>
            )}
        </div>
    )
}
