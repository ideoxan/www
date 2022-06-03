import { createClient } from "@supabase/supabase-js"

let dbURL = null
let dbKey = null

if (process.env.NODE_ENV === "production") {
    if (!process.env.SUPABASE_URL) throw new Error("Supabase URL is not set")
    if (!process.env.SUPABASE_ANON_KEY) throw new Error("Supabase key is not set")
    dbURL = process.env.SUPABASE_URL
    dbKey = process.env.SUPABASE_ANON_KEY
} else {
    if (!process.env.SUPABASE_URL_DEV) throw new Error("Supabase URL is not set")
    if (!process.env.SUPABASE_ANON_KEY_DEV) throw new Error("Supabase key is not set")
    dbURL = process.env.SUPABASE_URL_DEV
    dbKey = process.env.SUPABASE_ANON_KEY_DEV
}

const supabaseClient = createClient(dbURL, dbKey)

export { supabaseClient }
