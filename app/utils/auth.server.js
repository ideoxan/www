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

    return supabaseClient.auth.api.signInWithEmail(email, password)
        .then(({ data, error }) => {
            if (error || !data) throw new AuthorizationError("Invalid email or password")
            return data
        })
})

authenticator.use(supabaseLocalStrategy, "local")



// OAuth Strategy
export const supabaseOAuthStrategy = new SupabaseStrategy({
    supabaseClient: supabaseAdmin,
    sessionStorage,
    sessionKey: SESSION_KEY,
    sessionErrorKey: SESSION_ERROR_KEY,
}, async ({ req, supabaseClient }) => {
    const form = await req.formData()
    const session = form?.get("session")

    if (typeof session !== "string") throw new AuthorizationError("Session not found")

    return { data: JSON.parse(session), error: null }
})

authenticator.use(supabaseOAuthStrategy, "oauth")
