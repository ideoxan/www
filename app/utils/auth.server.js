import { createCookieSessionStorage } from "@remix-run/node"
import { Authenticator, AuthorizationError } from "remix-auth"
import { SupabaseStrategy } from "remix-auth-supabase"
import { supabaseAdmin } from "app/utils/db.server"

const SESSION_KEY = "ix:session"
const SESSION_ERROR_KEY = "ix:error"


if (!process.env.COOKIE_SECRET) {
    throw new Error("Cookie secret is not set")
}

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "ix",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        secrets: [process.env.COOKIE_SECRET],
    }
})
export const authenticator = new Authenticator(sessionStorage, {
    sessionKey: SESSION_KEY,
    sessionErrorKey: SESSION_ERROR_KEY,
})



// Local Strategy
export const supabaseLocalStrategy = new SupabaseStrategy({
    supabaseClient: supabaseAdmin,
    sessionStorage,
    sessionKey: SESSION_KEY,
    sessionErrorKey: SESSION_ERROR_KEY,
}, async ({ req, supabaseClient }) => {
    const formData = await req.formData()
    const email = formData?.get("email")
    const password = formData?.get("password")

    if (!email || typeof email !== "string") throw new AuthorizationError("Email is required")
    if (!password || typeof password !== "string") throw new AuthorizationError("Password is required")

    let { data, error } = await supabaseClient.auth.api.signInWithEmail(email, password)
    if (error || !data) {
        throw new AuthorizationError(error?.message || "An unknown error occurred")
    }

    await updateInfoOnAuth({ req, user: data?.user || null })

    return data
})
authenticator.use(supabaseLocalStrategy, "local")



// OAuth Strategy
export const supabaseOAuthStrategy = new SupabaseStrategy({
    supabaseClient: supabaseAdmin,
    sessionStorage,
    sessionKey: SESSION_KEY,
    sessionErrorKey: SESSION_ERROR_KEY,
}, async ({ req }) => {
    const form = await req.formData()
    const session = form?.get("session")

    if (typeof session !== "string") throw new AuthorizationError("Session not found")
    let parsedSession = JSON.parse(session)

    await updateInfoOnAuth({ req, user: parsedSession?.user || null })

    return parsedSession
})
authenticator.use(supabaseOAuthStrategy, "oauth")



const updateInfoOnAuth = async ({ req, user }) => {

    if (!user)
        throw new AuthorizationError("An unknown error occurred")

    let { data: selectData, error: selectError } = await supabaseAdmin
        .from("user_data")
        .select()
        .eq("id", user.id)

    if (selectError)
        throw new AuthorizationError(selectError?.message || "An unknown error occurred")

    let now = new Date()
    let userData = null
    let userDataError = null

    if (selectData.length == 0) {
        ({ data: userData, error: userDataError } = await supabaseAdmin
            .from("user_data")
            .insert([{
                id: user.id,
                created_at: now.toISOString(),
                roles: ["user"],
                last_sign_in_at: now.toISOString(),
                current_login_streak: 0,
                bio: "Hello, World! I am a new Ideoxan user!",
                full_name: "",
                location: "Unknown",
                avatar_url: "https://i.imgur.com/V4RclNb.png",
                pronouns: "",
                birthdate: null,
                privacy_visible: true,
                privacy_bio: true,
                privacy_full_name: true,
                privacy_location: true,
                privacy_avatar: true,
                privacy_pronouns: true,
                privacy_birthdate: true,
                api_secret: "",
                api_limit: 1000,
                rewards_points: 100,
            }]))
    } else {
        ({ data: userData, error: userDataError } = await supabaseAdmin
            .from("user_data")
            .update({
                last_sign_in_at: now.toISOString(),
                current_login_streak: (() => {
                    let current_login_streak = selectData[0].current_login_streak
                    let last_sign_in_at = selectData[0].last_sign_in_at

                    if (new Date().setUTCHours(0, 0, 0, 0)
                        - new Date(last_sign_in_at).setUTCHours(0, 0, 0, 0) == 86400000) {
                        return current_login_streak + 1
                    }

                    return 0
                })(),
            })
            .match({ id: user.id }))
    }

    if (userDataError)
        throw new AuthorizationError(userDataError?.message || "An unknown error occurred")
}
