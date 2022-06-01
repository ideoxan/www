import EditorActivityButton from "app/components/Editor/EditorActivityButton"

export default function EditorActivityBar({ availableActivities, activity, setActivity }) {

    return (
        <div className="h-full bg-gray-700 flex flex-col px-3 py-3 border-r border-r-gray-500 border-opacity-20">

            {/* Activity Buttons */}
            {availableActivities.map((item, i) => (
                <EditorActivityButton
                    key={i}
                    active={activity === i}
                    icon={item.icon}
                    onClick={() => {
                        setActivity(i)
                    }}
                    className="mb-2"
                />
            ))}

        </div>
    )
}
