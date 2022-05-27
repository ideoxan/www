import Icon from "app/components/Icon"

export default function EditorActivityWorkspace() {
    return (
        <>
            <h2 className="font-sans font-bold text-xs text-left text-gray-50">Workspace</h2>
            <div className="flex flex-row space-x-4 mt-4">
                <div className="flex flex-row p-2 rounded-md bg-gray-900 w-full h-max cursor-pointer">
                    <Icon
                        name="Folder"
                        width={4}
                        height={4}
                        color="gray-50"
                        strokeThickness={2}
                        className="my-auto"
                    />
                    <p className="font-sans font-medium text-xs text-left text-gray-50 ml-2 truncate">index.js</p>
                </div>
            </div>
        </>
    )

}
