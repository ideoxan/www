import Icon from "app/components/Icon"

export default function EditorActivityButton({ active, icon, onClick, className }) {

    let defaultClassNames = "flex p-2 rounded-md bg-gray-900 w-10 h-10 cursor-pointer "
    let activeClassNames = "bg-opacity-100 "
    let inactiveClassNames = "bg-opacity-0 opacity-50 hover:opacity-100 "

    return (
        <button className={defaultClassNames + (active ? activeClassNames : inactiveClassNames) + className} onClick={onClick}>
            <Icon
                name={icon}
                width={4}
                height={4}
                color="gray-50"
                strokeThickness={2}
                className="m-auto"
            />
        </button>
    )
}
