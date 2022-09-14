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
    await authenticator({ context }).isAuthenticated(request, {
        failureRedirect: "/login",
    })

    throw await authenticator({ context }).logout(request, { redirectTo: "/" })
}
