import Icon from "app/components/Icon"

export default function HomePageFeaturesItem({ icon, title, description }) {
    return (
        <li class="flex flex-row">
            <div class="flex flex-col bg-primary w-10 h-10 rounded-lg flex-shrink-0">
                <Icon
                    name={icon}
                    width={5}
                    height={5}
                    color="gray-50"
                    strokeThickness={2}
                    className="m-auto"
                />
            </div>
            <div class="flex flex-col ml-4">
                <h3 class="my-1 font-sans font-semibold text-lg text-gray-50">{title}</h3>
                <p class="paragraph">{description}</p>
            </div>
        </li>
    )
}
