import { Form, useActionData } from "@remix-run/react"
import { json, redirect } from "@remix-run/cloudflare"
import { authenticator, sessionStorage, supabaseLocalStrategy } from "app/utils/auth.server"
import AuthSplash from "app/components/Auth/AuthSplash"

export function meta() {
    return {
        title: "Join the Waitlist | Ideoxan",
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

export async function action({ request }) {
    // Get form data
    let form = await request.formData()
    let email = form.get("email")
    let name = form.get("name") || email?.split("@")[0]

    try {
        const urlEncodeObject = o =>
            Object.keys(o)
                .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(o[k]))
                .join("&")
        const addMemberEncoded = urlEncodeObject({
            subscribed: true,
            address: email,
            name: name,
            upsert: true,
        })

        const newMailingListMember = await fetch(global.env.MAILGUN_MAILING_LIST_URL, {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa("api:" + global.env.MAILGUN_API_KEY),
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": addMemberEncoded.length.toString(),
            },
            body: addMemberEncoded,
        })

        if (!newMailingListMember.ok) throw new Error("Error adding to mailing list")

        // Send welcome email
        const welcomeEmailEncoded = urlEncodeObject({
            from: "Ideoxan No Reply <ml-sender-no-reply@" + global.env.MAILGUN_DOMAIN_NAME + ">",
            to: email,
            subject: "Welcome to Ideoxan!",
            template: "mailing-list-welcome",
            "o:tag": "mailing-list-welcome",
        })

        const welcomeEmail = await fetch(global.env.MAILGUN_DOMAIN_ENDPOINT + "/messages", {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa("api:" + global.env.MAILGUN_API_KEY),
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": welcomeEmailEncoded.length.toString(),
            },
            body: welcomeEmailEncoded,
        })

        if (!welcomeEmail.ok) throw new Error("Error adding to mailing list")

        return redirect("/waitlist/success")
    } catch (error) {
        if (global.env.WORKER_ENV !== "production") console.log(error)
        return { error: { message: "There was an error adding you to the mailing list." } }
    }
}

export default function Waitlist() {
    let { error } = useActionData() || {}

    return (
        <AuthSplash>
            <h1 className="bg-gradient-white mx-auto bg-clip-text text-center font-sans text-2xl font-extrabold tracking-tight text-transparent">
                Join the Waitlist
            </h1>
            <p className="mx-auto mt-1 text-center font-sans text-sm font-medium text-gray-50 opacity-50">
                Enter your email below to get notified when we launch.
            </p>

            {error?.message && (
                <p className="mx-auto mt-6 rounded-lg bg-red-500/50 px-8 py-2 text-center font-sans text-xs font-medium text-red-50">
                    {error?.message}
                </p>
            )}

            {/* Signup form */}
            <Form method="post" autoComplete="off" className="mt-6 flex w-full flex-col">
                <input
                    type="name"
                    name="name"
                    autoComplete="on"
                    className="mt-4 block w-full appearance-none rounded-lg border border-gray-500 border-opacity-50 bg-gray-800 px-5 py-3 font-sans text-xs font-medium text-gray-50 text-opacity-70 outline-offset-0 focus:border-1 focus:border-primary focus:text-opacity-100 focus:outline-none"
                    placeholder="First Name"
                />
                <input
                    type="email"
                    name="email"
                    autoComplete="on"
                    className="mt-4 block w-full appearance-none rounded-lg border border-gray-500 border-opacity-50 bg-gray-800 px-5 py-3 font-sans text-xs font-medium text-gray-50 text-opacity-70 outline-offset-0 focus:border-1 focus:border-primary focus:text-opacity-100 focus:outline-none"
                    placeholder="Email"
                    required
                />

                <div className="mt-6 flex w-full flex-row">
                    <button
                        type="submit"
                        className="bttn bttn-square bttn-normal bttn-white my-auto ml-auto opacity-80 hover:opacity-100">
                        Join
                    </button>
                </div>
            </Form>
        </AuthSplash>
    )
}
