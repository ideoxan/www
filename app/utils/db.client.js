import { createClient } from "@supabase/supabase-js"

let dbURL = null
let dbKey = null

if (!window) throw new Error("Window is not defined")

if (window.env.WORKER_ENV === "production") {
    if (!window.env.SUPABASE_URL) throw new Error("Supabase URL is not set")
    if (!window.env.SUPABASE_ANON_KEY) throw new Error("Supabase key is not set")
    dbURL = window.env.SUPABASE_URL
    dbKey = window.env.SUPABASE_ANON_KEY
} else {
    if (!window.env.SUPABASE_URL_DEV) throw new Error("Supabase URL is not set")
    if (!window.env.SUPABASE_ANON_KEY_DEV) throw new Error("Supabase key is not set")
    dbURL = window.env.SUPABASE_URL_DEV
    dbKey = window.env.SUPABASE_ANON_KEY_DEV
}

const supabaseClient = createClient(dbURL, dbKey, {
    autoRefreshToken: false,
    persistSession: false,
})

async function oauthSignIn({ provider }) {
    supabaseClient.auth.signIn(
        { provider },
        {
            redirectTo: window.location.protocol + "//" + window.location.host + "/oauth/callback",
        }
    )
}

export { supabaseClient, oauthSignIn }
