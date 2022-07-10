import { json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { authenticator } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"

export async function loader({ request }) {
    let session = await authenticator.isAuthenticated(request)
    if (!session) throw redirect("/login")

    let { user } = session
    if (!user || !user.id) throw redirect("/login")

    let { data: userData, error } = supabaseAdmin.from("user_data")
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
