import { Link, Form, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import { authenticator, sessionStorage, supabaseLocalStrategy } from "app/utils/auth.server"
import AuthSplash from "app/components/Auth/AuthSplash"
import AuthOAuth from "app/components/Auth/AuthOAuth"

export function meta() {
    return {
        title: "Log In | Ideoxan"
    }
}

export async function loader({ request }) {
    await supabaseLocalStrategy.checkSession(request, {
        successRedirect: "/dashboard"
    })

    const session = await sessionStorage.getSession(request.headers.get("Cookie"))
    const error = session?.get(authenticator.sessionErrorKey) || null
    return json({ error })
}

export async function action({ request }) {
    await authenticator.authenticate("local", request, {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    })
}

export default function LogIn() {
    const { error } = useLoaderData()

    return (
        <AuthSplash>

            <h1 className="mx-auto font-sans font-extrabold tracking-tight text-center text-2xl text-gray-50">Log into an existing account</h1>
            <Link className="mx-auto mt-1 font-sans font-medium text-center text-sm text-gray-50 opacity-50 hover:underline" to="/signup">Or register for a new account</Link>

            {error?.message && (<p className="mx-auto mt-6 font-sans font-medium text-center text-xs px-8 py-2 bg-red-500/50 text-red-50 rounded-lg">{error?.message}</p>)}

            {/* Signup form */}
            <Form method="post" autoComplete="off" className="mt-6 flex flex-col w-full">

                <input type="email" name="email" autoComplete="on" className="mt-4 appearance-none block w-full px-5 py-3 bg-gray-800 text-gray-50 text-opacity-70 focus:text-opacity-100 text-xs font-sans font-medium rounded-lg border focus:border-1 border-gray-500 focus:border-primary border-opacity-50 focus:outline-none outline-offset-0" placeholder="Email" required />

                <input type="password" name="password" autoComplete="on" className="mt-4 appearance-none block w-full px-5 py-3 bg-gray-800 text-gray-50 text-opacity-70 focus:text-opacity-100 text-xs font-sans font-medium rounded-lg border focus:border-1 border-gray-500 focus:border-primary border-opacity-50 focus:outline-none outline-offset-0" placeholder="Password" required />

                <div className="w-full flex flex-row mt-6">

                    <a href="/resetpassword" className="mr-auto mb-auto font-sans font-medium text-center text-2xs text-gray-50 opacity-50 hover:underline">Reset Password</a>

                    <button type="submit" className="ml-auto my-auto bttn bttn-square bttn-normal bttn-white opacity-80 hover:opacity-100">Log In</button>

                </div>

            </Form>

            <div className="my-6 flex flex-row opacity-50">

                <div className="my-auto w-full h-px bg-gray-50 opacity-50"></div>
                <p className="font-sans font-bold text-center text-xs text-gray-50 opacity-50 px-4">OR</p>
                <div className="my-auto w-full h-px bg-gray-50 opacity-50"></div>

            </div>

            <AuthOAuth />

        </AuthSplash>
    )
}
