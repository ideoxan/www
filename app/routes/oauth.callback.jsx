import { useEffect } from 'react'
import { useFetcher } from '@remix-run/react'
import { json } from '@remix-run/node'
import { authenticator } from 'app/utils/auth.server'
import { supabaseClient } from 'app/utils/db.client'
import AuthScreen from 'app/components/AuthScreen'

export async function action({ request }) {
    await authenticator.authenticate('oauth', request, {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    })
}

export async function loader({ request }) {
    await authenticator.isAuthenticated(request, {
        successRedirect: '/dashboard',
    })
    return json({})
}

export default function OAuthCallback() {
    const fetcher = useFetcher()

    useEffect(() => {
        const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
            if (event == "SIGNED_IN") {
                const formData = new FormData()
                formData.append("session", JSON.stringify(session))
                fetcher.submit(formData, {
                    method: 'POST'
                })
            }
        })

        return () => {
            authListener?.unsubscribe()
        }
    }, [fetcher])

    return (
        <AuthScreen>

            <h1 className="mx-auto font-sans font-extrabold tracking-tight text-center text-2xl text-gray-50">Logging in...</h1>
            <p className="mx-auto mt-1 font-sans font-medium text-center text-sm text-gray-50 opacity-50">If the page does not redirect shortly, contact support.</p>

        </AuthScreen>
    )
}
