import Icon from "app/components/Icon"

export default function FeaturesItem({ icon, title, description }) {
    return (
        <li className="flex flex-row">
            <div className="flex flex-col bg-gradient-to-tr from-primary to-secondary w-10 h-10 rounded-lg flex-shrink-0">
                <Icon
                    name={icon}
                    width={5}
                    height={5}
                    color="gray-50"
                    strokeThickness={2}
                    className="m-auto"
                />
            </div>
            <div className="flex flex-col ml-4">
                <h3 className="my-1 font-sans font-semibold text-lg text-gray-50">{title}</h3>
                <p className="paragraph">{description}</p>
            </div>
        </li>
    )
}
