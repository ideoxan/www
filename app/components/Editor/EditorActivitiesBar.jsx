import EditorActivityButton from "app/components/Editor/EditorActivityButton"
import { useState } from "react"
import EditorActivityWorkspace from "app/components/Editor/Activities/EditorActivityWorkspace"

let activities = [
    {
        name: "Workspace",
        content: EditorActivityWorkspace,
        icon: "Folder"
    },
    {
        name: "Course Information",
        content: null,
        icon: "BookOpen"
    },
    {
        name: "Settings",
        content: null,
        icon: "Settings"
    }
]

export default function EditorActivityBar({ ...props }) {
    const [activity, setActivity] = useState(activities[0])

    return (
        <div className="h-full w-1/5 flex flex-row">

            {/* Activity Bar */}
            <div className="h-full bg-gray-700 flex flex-col px-3 py-3 border-r border-r-gray-500 border-opacity-20">

                {/* Activity Buttons */}
                {activities.map(item => (
                    <EditorActivityButton
                        key={item.name}
                        active={activity === item}
                        icon={item.icon}
                        onClick={() => {
                            setActivity(item)
                        }}
                        className="mb-2"
                    />
                ))}

            </div>

            {/* Activity Content */}
            <div className="h-full flex flex-col px-3 py-3 w-full bg-gray-700 border-r border-r-gray-500 border-opacity-20">
                {activity.content && (<activity.content {...props} />)}
            </div>

        </div>
    )
}
