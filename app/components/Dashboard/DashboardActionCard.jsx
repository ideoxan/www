import Icon from "app/components/Icon"

export default function DashboardActionCard({ label, sublabel, link }) {
    return (
        <div
            className="group flex w-full cursor-pointer flex-row rounded-lg px-6 py-4 ring-2 ring-gray-500 ring-opacity-50 hover:ring-opacity-80"
            onClick={() => {
                window.location.href = link
            }}>
            <div className="mr-auto flex w-max flex-col">
                <h4 className="font-sans text-2xs font-bold uppercase text-gray-50/50">
                    {sublabel}
                </h4>
                <h3 className="text-md mt-2 font-sans font-semibold text-gray-50/80">{label}</h3>
            </div>
            <div className="ml-auto flex w-max flex-col">
                <Icon
                    name="ArrowRight"
                    className="my-auto text-gray-50 opacity-50 group-hover:opacity-80"
                    width={6}
                    height={6}
                    color="0"
                />
            </div>
        </div>
    )
}
