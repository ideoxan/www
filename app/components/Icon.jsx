import * as iconSet from 'lucide-react'

export default function Icon({
    name = null,
    className = "",
    width = 4,
    height = 4,
    color = "gray-50",
    strokeThickness = 2
}) {

    if (name == null || typeof iconSet[name] === "undefined") {
        throw new Error("Icon name is required")
    }

    let classNameString = `w-${ width } h-${ height } text-${ color } stroke-${ color } stroke-${ strokeThickness } ${ className }`
    let IconComponent = iconSet[name]

    return (
        <IconComponent className={classNameString} />
    )
}
