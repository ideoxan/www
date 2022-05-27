import Icon from "app/components/Icon"

export default function EditorCodeTab({ active = false, FileTypeIconName = null, fileTypeIconColor = "#fff", label = "New Tab", closeHandler = null, canBeClosed = true, ...props }) {
    let defaultClassNames = "flex flex-row flex-grow-0 flex-shrink-0 w-48 pl-4 pr-2 py-2 mr-2 rounded-lg border-2 border-primary bg-gray-700 cursor-pointer "
    let activeClassNames = "border-opacity-100 bg-opacity-100 opacity-100"
    let inactiveClassNames = "border-opacity-0 bg-opacity-0 opacity-50"

    return (
        <div className={defaultClassNames + (active ? activeClassNames : inactiveClassNames)} {...props}>
            {FileTypeIconName ? (
                <FileTypeIconName className="w-2 h-2 my-auto" color={fileTypeIconColor} />
            ) : (
                <Icon
                    name="File"
                    width={2}
                    height={2}
                    className="ml-auto text-gray-50"
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
