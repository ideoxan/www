import { createCookieSessionStorage } from "@remix-run/cloudflare"
import { Authenticator, AuthorizationError } from "remix-auth"
import { SupabaseStrategy } from "remix-auth-supabase"
import { supabaseAdmin } from "app/utils/db.server"

const SESSION_KEY = "ix:session"
const SESSION_ERROR_KEY = "ix:error"

let storageInstance = null
let localStrategyInstance = null
let oAuthStrategyInstance = null
let authenticatorInstance = null

export const sessionStorage = ({ context }) => {
    if (storageInstance) return storageInstance

    if (!context.COOKIE_SECRET) {
        throw new Error("Cookie secret is not set")
    }

    storageInstance = createCookieSessionStorage({
        cookie: {
            name: "ix",
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: context.NODE_ENV === "production",
            secrets: [context.COOKIE_SECRET],
        },
    })

    return storageInstance
}

export const authenticator = ({ context }) => {
    if (authenticatorInstance) return authenticatorInstance

    authenticatorInstance = new Authenticator(sessionStorage({ context }), {
        sessionKey: SESSION_KEY,
        sessionErrorKey: SESSION_ERROR_KEY,
    })
    authenticator({ context }).use(supabaseLocalStrategy({ context }), "local")
    authenticator({ context }).use(supabaseOAuthStrategy({ context }), "oauth")

    return authenticatorInstance
}

// Local Strategy
export const supabaseLocalStrategy = ({ context }) => {
    if (localStrategyInstance) return localStrategyInstance

    localStrategyInstance = new SupabaseStrategy(
        {
            supabaseClient: supabaseAdmin({ context }),
            sessionStorage: sessionStorage({ context }),
            sessionKey: SESSION_KEY,
            sessionErrorKey: SESSION_ERROR_KEY,
        },
        async ({ req, supabaseClient }) => {
            const formData = await req.formData()
            const email = formData?.get("email")
            const password = formData?.get("password")

            if (!email || typeof email !== "string")
                throw new AuthorizationError("Email is required")
            if (!password || typeof password !== "string")
                throw new AuthorizationError("Password is required")

            let { data, error } = await supabaseClient.auth.api.signInWithEmail(email, password)
            if (error || !data) {
                throw new AuthorizationError(error?.message || "An unknown error occurred")
            }

            await updateInfoOnAuth({ req, user: data?.user || null, context })

            return data
        }
    )
    authenticator({ context }).use(localStrategyInstance, "local")

    return localStrategyInstance
}

// OAuth Strategy
export const supabaseOAuthStrategy = ({ context }) => {
    if (oAuthStrategyInstance) return oAuthStrategyInstance

    oAuthStrategyInstance = new SupabaseStrategy(
        {
            supabaseClient: supabaseAdmin({ context }),
            sessionStorage: sessionStorage({ context }),
            sessionKey: SESSION_KEY,
            sessionErrorKey: SESSION_ERROR_KEY,
        },
        async ({ req }) => {
            const form = await req.formData()
            const session = form?.get("session")

            if (typeof session !== "string") throw new AuthorizationError("Session not found")
            let parsedSession = JSON.parse(session)

            await updateInfoOnAuth({ req, user: parsedSession?.user || null, context })

            return parsedSession
        }
    )
    authenticator({ context }).use(oAuthStrategyInstance, "oauth")

    return oAuthStrategyInstance
}

// Update user info on auth
const updateInfoOnAuth = async ({ req, user, context }) => {
    if (!user) throw new AuthorizationError("An unknown error occurred")

    let { data: selectData, error: selectError } = await supabaseAdmin({ context })
        .from("user_data")
        .select()
        .eq("id", user.id)

    if (selectError)
        throw new AuthorizationError(selectError?.message || "An unknown error occurred")

    let now = new Date()
    let userDataError = null

    if (selectData.length == 0) {
        // If user data does not exist, create it
        ;({ error: userDataError } = await supabaseAdmin({ context })
            .from("user_data")
            .insert([
                {
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
                    api_hit_count: 0,
                    api_limit: 1000,
                    rewards_points: 100,
                },
            ]))
    } else {
        // If user data exists, update it
        let current_login_streak = selectData[0].current_login_streak
        let last_sign_in_at = selectData[0].last_sign_in_at
        let newDay =
            new Date().setUTCHours(0, 0, 0, 0) -
                new Date(last_sign_in_at).setUTCHours(0, 0, 0, 0) ==
            86400000

        ;({ error: userDataError } = await supabaseAdmin({ context })
            .from("user_data")
            .update({
                last_sign_in_at: now.toISOString(),
                current_login_streak: newDay ? current_login_streak + 1 : 0,
                api_hit_count: newDay ? 0 : selectData[0].api_hit_count,
            })
            .match({ id: user.id }))
    }

    if (userDataError)
        throw new AuthorizationError(userDataError?.message || "An unknown error occurred")
}
