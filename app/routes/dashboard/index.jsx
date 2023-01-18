import DashboardActionCard from "app/components/Dashboard/DashboardActionCard"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const times = [
    [22, "night"],
    [18, "evening"],
    [12, "afternoon"],
    [6, "morning"],
    [0, "night"],
]

export default function DashboardOverview() {
    function genSubheaderTD() {
        let date = new Date()
        for (let d of times) if (date.getHours() >= d[0]) return `${days[date.getDay()]} ${d[1]}`
    }

    const subheaderTD = genSubheaderTD()

    return (
        <>
            <h1 className="section-header">Welcome back Skyclo</h1>
            <h2 className="text-md mt-3 font-sans font-semibold tracking-tight text-gray-50 opacity-80">
                Things to do on this {subheaderTD}.
            </h2>
            <div className="mt-6 flex w-full flex-row space-x-4">
                <DashboardActionCard
                    label="Intro to HTML"
                    sublabel="Resume Working"
                    link="/learn/0000aaaa-00aa-00aa-00000000aaaaaaa/0/0"
                />
                <DashboardActionCard
                    label="Add a bio to your profile"
                    sublabel="Starter Tasks (1/4)"
                    link="/profile"
                />
                <DashboardActionCard
                    label="Intro to CSS"
                    sublabel="Learn something new"
                    link="/learn/0000aaaa-00aa-00aa-00000000aaaaaaa/0/0"
                />
            </div>
            <div className="mt-6 flex w-full flex-row space-x-4"></div>
        </>
    )
}
