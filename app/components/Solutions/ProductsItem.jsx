import Icon from "app/components/Icon"

export default function ProductsItem({ icon, title, description }) {
    return (
        <li className="flex flex-col p-8">
            <div className="mx-auto flex h-10 w-10 flex-shrink-0 flex-col rounded-lg bg-gradient-to-tr from-primary to-secondary">
                <Icon
                    name={icon}
                    width={5}
                    height={5}
                    color="gray-50"
                    strokeThickness={2}
                    className="m-auto"
                />
            </div>
            <h3 className="mt-4 mb-1 text-center font-sans text-xl font-semibold text-gray-50">
                {title}
            </h3>
            <p className="font-style-paragraph text-center">{description}</p>
        </li>
    )
}
