import { createCookieSessionStorage } from "@remix-run/node"
import { Authenticator, AuthorizationError } from "remix-auth"
import { SupabaseStrategy } from "remix-auth-supabase"
import { supabaseClient } from "app/utils/db.server"

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

export const supabaseStrategy = new SupabaseStrategy({
    supabaseClient,
    sessionStorage,
    sessionKey: "ix:session",
    sessionErrorKey: "ix:error",
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

export const authenticator = new Authenticator(sessionStorage, {
    sessionKey: supabaseStrategy.sessionKey,
    sessionErrorKey: supabaseStrategy.sessionErrorKey,
})

authenticator.use(supabaseStrategy, "local")
