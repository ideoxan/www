import EditorActivityButton from "app/components/Editor/EditorActivityButton"

export default function EditorActivityBar({ activity, setActivity }) {
    return (
        <div className="flex h-full flex-col border-r border-r-gray-500 border-opacity-20 bg-gray-700 px-3 py-3">
            {/* Activity Buttons */}
            <EditorActivityButton
                active={activity === 0}
                icon="Folder"
                onClick={() => {
                    setActivity(0)
                }}
                className="mb-2"
            />
            <EditorActivityButton
                active={activity === 1}
                icon="BookOpen"
                onClick={() => {
                    setActivity(1)
                }}
                className="mb-2"
            />
            <EditorActivityButton
                active={activity === 2}
                icon="Settings"
                onClick={() => {
                    setActivity(2)
                }}
                className="mb-2"
            />
        </div>
    )
}
