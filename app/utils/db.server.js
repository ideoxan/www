import { createClient } from "@supabase/supabase-js"

let supabaseAdmin = () => {
    if (!global.env.SUPABASE_URL) throw new Error("Supabase URL is not set")
    if (!global.env.SUPABASE_SECRET_KEY) throw new Error("Supabase key is not set")

    return createClient(global.env.SUPABASE_URL, global.env.SUPABASE_SECRET_KEY)
}

export { supabaseAdmin }
