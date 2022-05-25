
export default function Icon({
    name = null,
    className = "",
    width = 4,
    height = 4,
    color = "gray-50",
    source = "/icons/sprite.svg",
    strokeThickness = 2
}) {

    if (name == null) {
        throw new Error("Icon name is required")
    }

    let classNameString = `w-${ width } h-${ height } text-${ color } stroke-${ color } stroke-${ strokeThickness } ${ className }`

    return (
        <svg className={classNameString} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref={source + '#' + name} />
        </svg>
    )
}
