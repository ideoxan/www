import Icon from "app/components/Icon"

export default function DashboardSidebarTab({ icon, label, active, link, onClick }) {
    return (
        <>
            {active ? (
                <button
                    className="flex flex-row rounded-full bg-gray-500/40 px-4 py-3 font-sans text-sm font-semibold text-secondary opacity-100"
                    onClick={() => {
                        if (onClick) onClick()
                        //window.location.href = link
                    }}>
                    <Icon
                        name={icon}
                        width={4}
                        height={4}
                        color="0"
                        strokeThickness={3}
                        className="my-auto"
                    />
                    <span className="ml-2">{label}</span>
                </button>
            ) : (
                <button
                    className="flex flex-row rounded-full bg-gray-500/0 px-4 py-3 font-sans text-sm font-semibold text-gray-50 opacity-30"
                    onClick={() => {
                        if (onClick) onClick()
                        window.location.href = link
                    }}>
                    <Icon
                        name={icon}
                        width={4}
                        height={4}
                        color="0"
                        strokeThickness={2}
                        className="my-auto"
                    />
                    <span className="ml-2">{label}</span>
                </button>
            )}
        </>
    )
}
