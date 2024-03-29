import { createCookieSessionStorage } from "@remix-run/cloudflare"
import { Authenticator, AuthorizationError } from "remix-auth"
import { SupabaseStrategy } from "remix-auth-supabase"
import { supabaseAdmin } from "app/utils/db.server"

const SESSION_KEY = "ix:session"
const SESSION_ERROR_KEY = "ix:error"

export const sessionStorage = () => {
    if (!global.env.COOKIE_SECRET) {
        throw new Error("Cookie secret is not set")
    }

    return createCookieSessionStorage({
        cookie: {
            name: "ix",
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: global.env.WORKER_ENV === "production",
            secrets: [global.env.COOKIE_SECRET],
        },
    })
}

export const authenticator = () => {
    let auth = new Authenticator(sessionStorage(), {
        sessionKey: SESSION_KEY,
        sessionErrorKey: SESSION_ERROR_KEY,
    })
    auth.use(supabaseLocalStrategy(), "local")
    auth.use(supabaseOAuthStrategy(), "oauth")

    return auth
}

// Local Strategy
export const supabaseLocalStrategy = () => {
    return new SupabaseStrategy(
        {
            supabaseClient: supabaseAdmin(),
            sessionStorage: sessionStorage(),
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

            await updateInfoOnAuth({ req, user: data?.user || null })

            return data
        }
    )
}

// OAuth Strategy
export const supabaseOAuthStrategy = () => {
    return new SupabaseStrategy(
        {
            supabaseClient: supabaseAdmin(),
            sessionStorage: sessionStorage(),
            sessionKey: SESSION_KEY,
            sessionErrorKey: SESSION_ERROR_KEY,
        },
        async ({ req }) => {
            const form = await req.formData()
            const session = form?.get("session")

            if (typeof session !== "string") throw new AuthorizationError("Session not found")
            let parsedSession = JSON.parse(session)

            await updateInfoOnAuth({ req, user: parsedSession?.user || null })

            return parsedSession
        }
    )
}

// Update user info on auth
const updateInfoOnAuth = async ({ user }) => {
    if (!user) throw new AuthorizationError("An unknown error occurred")

    let { data: selectData, error: selectError } = await supabaseAdmin()
        .from("user_data")
        .select()
        .eq("id", user.id)

    if (selectError)
        throw new AuthorizationError(selectError?.message || "An unknown error occurred")

    let now = new Date()
    let userDataError = null

    if (selectData.length == 0) {
        // If user data does not exist, create it
        ;({ error: userDataError } = await supabaseAdmin()
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

        ;({ error: userDataError } = await supabaseAdmin()
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

// Util methods
/**
 * Returns authentication data from Supabase (session and user data). JSON return is guaranteed
 * and errors are bubbled up. The session field returned is the current user's session (null if
 * not authenticated). The data field returned is the current user's data (null if not
 * authenticated). The error field returned is the error encountered (null if no error)
 * (invalid_session or supabaseError).
 *
 * @param {Request} req
 * @returns Promise<{ session: any, data: any, error: any }>
 * @example
 * export async function loader({ request }) {
 *      let { session, data, error } = await getAuthData(request)
 *      if (error == "invalid_session")
 *          return redirect("/login", { headers: { "Set-Cookie": "" } })
 *      return json({ session, data, error })
 * }
 *
 */
export async function getAuthData(req) {
    // Check user auth
    let session = await supabaseLocalStrategy().checkSession(req)

    if (session) {
        let { user } = session

        // If the user session is bad, redirect to the login page
        if (!user?.id) return { session: null, data: null, error: "invalid_session" }

        // If the user is authenticated, get the user's data from the database
        let { data, error } = await supabaseAdmin()
            .from("user_data")
            .select()
            .eq("id", user.id)
            .maybeSingle()

        if (error) return { session: null, data: null, error }

        if (data) {
            // If the user data exists, return it
            return { session, data, error: null }
        }
    }

    // If there is no session or no user data, return null (not authenticated)
    return { session: null, data: null, error: null }
}
