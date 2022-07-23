import { json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"

export async function loader({ request }) {
    // Check user auth
    const session = await supabaseLocalStrategy.checkSession(request, {
        failureRedirect: "/login"
    })

    // If the user session is bad, redirect to the login page
    let { user } = session
    if (!user || !user.id) throw redirect("/login")

    // If the user is authenticated, get the user's data from the database
    let { data: userData, error: userDataError } = supabaseAdmin.from("user_data")
        .select()
        .eq("id", user.id)

    return json({ userData })
}

export default function Dashboard() {
    let { userData } = useLoaderData()

    return (
        <h1>Dashboard</h1>
    )
}
