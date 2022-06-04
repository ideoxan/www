import { json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { authenticator } from "app/utils/auth.server"
import { supabaseAdmin } from "app/utils/db.server"

export async function loader({ request }) {
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login"
    })

    let { data: profile, error } = supabaseAdmin.from("profiles")
        .select("id")
        .eq("id", user.id)

    if (!profile) throw redirect("/onboarding")

    return json({ profile, user })
}

export default function Dashboard() {
    let { profile, user } = useLoaderData()

    return (
        <h1>Dashboard</h1>
    )
}
