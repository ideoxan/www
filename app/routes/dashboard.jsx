import { json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"

export async function loader({ request }) {
    // Check user auth
    let session = await supabaseLocalStrategy.checkSession(request)

    // If the user session is bad, redirect to the login page
    if (session) {
        let { user } = session
        if (!user || !user.id) throw redirect("/login")

        // If the user is authenticated, get the user's data from the database
        let { data: userData, error } = await supabaseAdmin.from("user_data")
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

    return (
        <h1>Dashboard</h1>
    )
}
