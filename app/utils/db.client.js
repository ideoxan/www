import { createClient } from "@supabase/supabase-js"

if (!window) throw new Error("Window is not defined")

if (!window.env.SUPABASE_URL) throw new Error("Supabase URL is not set")
if (!window.env.SUPABASE_ANON_KEY) throw new Error("Supabase key is not set")

const supabaseClient = createClient(window.env.SUPABASE_URL, window.env.SUPABASE_ANON_KEY, {
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
