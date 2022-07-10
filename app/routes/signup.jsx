import { Link, Form, useActionData } from "@remix-run/react"
import { json, redirect } from "@remix-run/node"
import { authenticator, sessionStorage } from "app/utils/auth.server"
import { supabaseAdmin } from "app/utils/db.server"
import AuthSplash from "app/components/Auth/AuthSplash"
import AuthOAuth from "app/components/Auth/AuthOAuth"

export function meta() {
    return {
        title: "Sign Up | Ideoxan"
    }
}

export async function loader({ request }) {
    await authenticator.isAuthenticated(request, {
        successRedirect: "/dashboard"
    })

    const session = await sessionStorage.getSession(request.headers.get("Cookie"))
    const error = session?.get(authenticator.sessionErrorKey)
    return json({
        error
    })
}

export async function action({ request }) {
    // Get form data
    let form = await request.formData()
    let email = form.get("email")
    let password = form.get("password")
    let passwordConfirm = form.get("password_confirm")

    // Check if passwords match
    if (password !== passwordConfirm) {
        return {
            error: {
                message: "Passwords do not match"
            }
        }
    }

    let { session, error } = await supabaseAdmin.auth.signUp({
        email,
        password
    })

    if (error) {
        return { error }
    }

    if (!session) {
        return {
            error: {
                message: "We have sent you an email to verify your email address."
            }
        }
    }

    throw redirect("/dashboard")
}

export default function Signup({ request }) {
    let { error } = useActionData() || {}

    return (
        <AuthSplash>

            <h1 className="mx-auto font-sans font-extrabold tracking-tight text-center text-2xl text-gray-50">Register for a new account</h1>
            <Link className="mx-auto mt-1 font-sans font-medium text-center text-sm text-gray-50 opacity-50 hover:underline" to="/login">Or log into an existing account</Link>

            {error?.message && (<p className="mx-auto mt-6 font-sans font-medium text-center text-xs px-8 py-2 bg-red-500/50 text-red-50 rounded-lg">{error?.message}</p>)}

            {/* Signup form */}
            <Form method="post" autoComplete="off" className="mt-6 flex flex-col w-full">

                <input type="email" name="email" autoComplete="on" className="mt-4 appearance-none block w-full px-5 py-3 bg-gray-800 text-gray-50 text-opacity-70 focus:text-opacity-100 text-xs font-sans font-medium rounded-lg border focus:border-1 border-gray-500 focus:border-primary border-opacity-50 focus:outline-none outline-offset-0" placeholder="Email" required />

                <input type="password" name="password" autoComplete="on" className="mt-4 appearance-none block w-full px-5 py-3 bg-gray-800 text-gray-50 text-opacity-70 focus:text-opacity-100 text-xs font-sans font-medium rounded-lg border focus:border-1 border-gray-500 focus:border-primary border-opacity-50 focus:outline-none outline-offset-0" placeholder="Password" required />

                <input type="password" name="password_confirm" autoComplete="on" className="mt-4 appearance-none block w-full px-5 py-3 bg-gray-800 text-gray-50 text-opacity-70 focus:text-opacity-100 text-xs font-sans font-medium rounded-lg border focus:border-1 border-gray-500 focus:border-primary border-opacity-50 focus:outline-none outline-offset-0" placeholder="Confirm Password" required />

                <div className="w-full flex flex-row mt-6">

                    {/* <a href="/resetpassword" className="mr-auto mb-auto font-sans font-medium text-center text-2xs text-gray-50 opacity-50 hover:underline">Reset Password</a> */}

                    <button type="submit" className="ml-auto my-auto bttn bttn-square bttn-normal bttn-white opacity-80 hover:opacity-100">Sign Up</button>

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
