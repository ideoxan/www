import EditorActivityButton from "app/components/Editor/EditorActivityButton"

export default function EditorActivityBar({ activity, setActivity }) {
    return (
        <div className="h-full bg-gray-700 flex flex-col px-3 py-3 border-r border-r-gray-500 border-opacity-20">
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
