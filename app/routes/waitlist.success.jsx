import { useActionData } from "@remix-run/react"
import { json } from "@remix-run/cloudflare"
import { authenticator, sessionStorage, supabaseLocalStrategy } from "app/utils/auth.server"
import AuthSplash from "app/components/Auth/AuthSplash"

export function meta() {
    return {
        title: "Welcome to the Waitlist! | Ideoxan",
    }
}

export async function loader({ request }) {
    //prodBlockServer()

    await supabaseLocalStrategy().checkSession(request, {
        successRedirect: "/dashboard",
    })

    const session = await sessionStorage().getSession(request.headers.get("Cookie"))
    const error = session?.get(authenticator().sessionErrorKey) || null
    return json({ error })
}

export default function WaitlistSuccess() {
    let { error } = useActionData() || {}

    return (
        <AuthSplash>
            <h1 className="bg-gradient-white mx-auto bg-clip-text text-center font-sans text-2xl font-extrabold tracking-tight text-transparent">
                Check your inbox!
            </h1>
            <p className="mx-auto mt-1 text-center font-sans text-sm font-medium text-gray-50 opacity-50">
                We sent you a welcome email. See you around!
            </p>

            {error?.message && (
                <p className="mx-auto mt-6 rounded-lg bg-red-500/50 px-8 py-2 text-center font-sans text-xs font-medium text-red-50">
                    {error?.message}
                </p>
            )}
        </AuthSplash>
    )
}
