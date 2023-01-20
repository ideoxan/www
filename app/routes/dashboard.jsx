import { json, redirect } from "@remix-run/cloudflare"
import { Outlet, useLoaderData, useMatches } from "@remix-run/react"
import { getAuthData } from "app/utils/auth.server.js"
import NavigationBar from "app/components/NavigationBar"
import DashboardSidebarTab from "app/components/Dashboard/DashboardSidebarTab"
import { useState } from "react"

export const meta = () => {
    return {
        title: "Dashboard | Ideoxan",
    }
}

export async function loader({ request }) {
    // Load the user data and session
    let { session, data, error } = await getAuthData(request)
    // Redirect to login if invalid session
    if (error == "invalid_session") return redirect("/login", { headers: { "Set-Cookie": "" } })

    return json({ session, data, error })
}

export default function Dashboard() {
    let { session, userData } = useLoaderData()

    const [activeTab, setActiveTab] = useState(useMatches()[2]?.pathname || "/dashboard/")
    let tabs = [
        {
            icon: "Component",
            label: "Overview",
            link: "/dashboard/",
        },
        {
            icon: "User",
            label: "Profile",
            link: "/dashboard/profile",
        },
        {
            icon: "BookOpen",
            label: "Courses",
            link: "/dashboard/courses",
        },
        {
            icon: "Settings2",
            label: "Settings",
            link: "/dashboard/settings",
        },
    ]

    return (
        <>
            <NavigationBar session={session} userData={userData} />
            <div className="flex h-full w-full flex-row pt-24">
                <div className="flex w-1/5 flex-col space-y-3 px-12">
                    {tabs.map((tab, index) => (
                        <DashboardSidebarTab
                            key={index}
                            icon={tab.icon}
                            label={tab.label}
                            link={tab.link}
                            active={activeTab === tab.link}
                            onClick={() => setActiveTab(tab.link)}
                        />
                    ))}
                </div>
                <div className="flex w-4/5 flex-col pr-12">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
