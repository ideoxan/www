import { Link, Form, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/cloudflare"
import { authenticator, sessionStorage, supabaseLocalStrategy } from "app/utils/auth.server"
import AuthSplash from "app/components/Auth/AuthSplash"
import AuthOAuth from "app/components/Auth/AuthOAuth"
import prodBlockServer from "app/utils/prodBlock.server"

export function meta() {
    return {
        title: "Log In | Ideoxan",
    }
}

export async function loader({ request, context }) {
    prodBlockServer()

    await supabaseLocalStrategy({ context }).checkSession(request, {
        successRedirect: "/dashboard",
    })

    const session = await sessionStorage({ context }).getSession(request.headers.get("Cookie"))
    const error = session?.get(authenticator({ context }).sessionErrorKey) || null
    return json({ error })
}

export async function action({ request, context }) {
    await authenticator({ context }).authenticate("local", request, {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
    })
}

export default function LogIn() {
    const { error } = useLoaderData()

    return (
        <AuthSplash>
            <h1 className="section-header bg-gradient-white mx-auto bg-clip-text text-center font-sans text-2xl font-extrabold tracking-tight text-transparent">
                Log into an existing account
            </h1>
            <Link
                className="mx-auto mt-1 text-center font-sans text-sm font-medium text-gray-50 opacity-50 hover:underline"
                to="/signup">
                Or register for a new account
            </Link>

            {error?.message && (
                <p className="mx-auto mt-6 rounded-lg bg-red-500/50 px-8 py-2 text-center font-sans text-xs font-medium text-red-50">
                    {error?.message}
                </p>
            )}

            {/* Signup form */}
            <Form method="post" autoComplete="off" className="mt-6 flex w-full flex-col">
                <input
                    type="email"
                    name="email"
                    autoComplete="on"
                    className="focus:border-1 mt-4 block w-full appearance-none rounded-lg border border-gray-500 border-opacity-50 bg-gray-800 px-5 py-3 font-sans text-xs font-medium text-gray-50 text-opacity-70 outline-offset-0 focus:border-primary focus:text-opacity-100 focus:outline-none"
                    placeholder="Email"
                    required
                />

                <input
                    type="password"
                    name="password"
                    autoComplete="on"
                    className="focus:border-1 mt-4 block w-full appearance-none rounded-lg border border-gray-500 border-opacity-50 bg-gray-800 px-5 py-3 font-sans text-xs font-medium text-gray-50 text-opacity-70 outline-offset-0 focus:border-primary focus:text-opacity-100 focus:outline-none"
                    placeholder="Password"
                    required
                />

                <div className="mt-6 flex w-full flex-row">
                    <a
                        href="/resetpassword"
                        className="mr-auto mb-auto text-center font-sans text-2xs font-medium text-gray-50 opacity-50 hover:underline">
                        Reset Password
                    </a>

                    <button
                        type="submit"
                        className="bttn bttn-square bttn-normal bttn-white my-auto ml-auto opacity-80 hover:opacity-100">
                        Log In
                    </button>
                </div>
            </Form>

            <div className="my-6 flex flex-row opacity-50">
                <div className="my-auto h-px w-full bg-gray-50 opacity-50"></div>
                <p className="px-4 text-center font-sans text-xs font-bold text-gray-50 opacity-50">
                    OR
                </p>
                <div className="my-auto h-px w-full bg-gray-50 opacity-50"></div>
            </div>

            <AuthOAuth />
        </AuthSplash>
    )
}
