import Icon from "app/components/Icon"

export default function FeaturesItem({ icon, title, description }) {
    return (
        <li className="flex flex-row">
            <div className="flex h-10 w-10 flex-shrink-0 flex-col rounded-lg bg-gradient-to-tr from-primary to-secondary">
                <Icon
                    name={icon}
                    width={5}
                    height={5}
                    color="gray-50"
                    strokeThickness={2}
                    className="m-auto"
                />
            </div>
            <div className="ml-4 flex flex-col">
                <h3 className="my-1 font-sans text-lg font-semibold text-gray-50">{title}</h3>
                <p className="paragraph">{description}</p>
            </div>
        </li>
    )
}
