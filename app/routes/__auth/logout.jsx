import { authenticator } from "app/utils/auth.server"

export async function action({ request, context }) {
    await handle(request, context)
    return null
}

export async function loader({ request, context }) {
    await handle(request, context)
    return null
}

async function handle(request, context) {
    await authenticator().isAuthenticated(request, {
        failureRedirect: "/login",
    })

    throw await authenticator().logout(request, { redirectTo: "/" })
}
