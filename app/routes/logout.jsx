import { supabaseStrategy, authenticator } from "app/utils/auth.server"

export async function action({ request }) {
    await handle(request)
    return null
}

export async function loader({ request }) {
    await handle(request)
    return null
}

async function handle(request) {
    await supabaseStrategy.checkSession(request, {
        failureRedirect: "/login",
    })

    console.log("Logging out...")
    throw await authenticator.logout(request, { redirectTo: "/" })
}
