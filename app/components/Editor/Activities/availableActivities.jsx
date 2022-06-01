import EditorActivityWorkspace from "app/components/Editor/Activities/EditorActivityWorkspace"

// Activities available in the editor
export default [
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
