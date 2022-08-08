import { useEffect } from "react"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { json, redirect } from "@remix-run/node"
import { authenticator } from "app/utils/auth.server.js"
import { supabaseClient } from "app/utils/db.client"
import AuthSplash from "app/components/Auth/AuthSplash"

export async function action({ request }) {
    let session = await authenticator.authenticate("oauth", request, {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
    })

    if (!session) throw redirect("/login")

    let { user } = session

    if (!user || !user.id) throw redirect("/login")
}

export async function loader({ request }) {
    await authenticator.isAuthenticated(request, {
        successRedirect: "/dashboard",
    })

    const searchParams = new URL(request.url)?.searchParams
    if (!searchParams || searchParams.get("error")) {
        return json({
            error: {
                message: searchParams.get("error_description") || searchParams.get("error"),
            },
        })
    }
    return json({})
}

export default function OAuthCallback() {
    const fetcher = useFetcher()
    const loaderData = useLoaderData()

    useEffect(() => {
        const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
            if (event == "SIGNED_IN" && session) {
                const formData = new FormData()
                formData.append("session", JSON.stringify(session))
                fetcher.submit(formData, {
                    method: "POST",
                })
            }
        })

        return () => {
            authListener?.unsubscribe()
        }
    }, [fetcher])

    return (
        <AuthSplash>
            {loaderData?.error ? (
                <>
                    <h1 className="mx-auto font-sans font-extrabold tracking-tight text-center text-2xl text-gray-50">
                        Sign in failed.
                    </h1>
                    <p className="mx-auto mt-6 font-sans font-medium text-center text-xs px-8 py-2 bg-red-500/50 text-red-50 rounded-lg">
                        {loaderData?.error?.message}
                    </p>
                </>
            ) : (
                <>
                    <h1 className="mx-auto font-sans font-extrabold tracking-tight text-center text-2xl text-gray-50">
                        Logging in...
                    </h1>
                    <p className="mx-auto mt-1 font-sans font-medium text-center text-sm text-gray-50 opacity-50">
                        If the page does not redirect shortly, contact support.
                    </p>
                </>
            )}
        </AuthSplash>
    )
}
