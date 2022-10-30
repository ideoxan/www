import { json, redirect } from "@remix-run/cloudflare"
import { Outlet, useLoaderData, useMatches } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"
import NavigationBar from "app/components/NavigationBar"
import DashboardSidebarTab from "app/components/Dashboard/DashboardSidebarTab"
import { useState } from "react"

export const meta = () => {
    return {
        title: "Dashboard | Ideoxan",
    }
}

export async function loader({ request, context }) {
    // Check user auth
    let session = await supabaseLocalStrategy().checkSession(request)

    // If the user session is bad, redirect to the login page
    if (session) {
        let { user } = session
        if (!user || !user.id) throw redirect("/login")

        // If the user is authenticated, get the user's data from the database
        let { data: userData, error } = await supabaseAdmin()
            .from("user_data")
            .select()
            .eq("id", user.id)

        if (error) return json({ session: null, userData: null, error })

        if (userData) {
            return json({ session, userData: userData[0] })
        }
    }

    return json({ session: null, userData: null })
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
