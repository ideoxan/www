import { createClient } from "@supabase/supabase-js"

let supabaseAdmin = () => {
    let dbURL = null
    let dbKey = null

    if (!global.env.WORKER_ENV) throw new Error("Process is not defined")

    if (global.env.WORKER_ENV === "production") {
        dbURL = global.env.SUPABASE_URL
        dbKey = global.env.SUPABASE_SECRET_KEY
    } else {
        dbURL = global.env.SUPABASE_URL_DEV
        dbKey = global.env.SUPABASE_SECRET_KEY_DEV
    }
    if (!global.env) throw new Error("Environment is not defined")
    if (!dbURL) throw new Error("Supabase URL is not set")
    if (!dbKey) throw new Error("Supabase key is not set")

    return createClient(dbURL, dbKey)
}

export { supabaseAdmin }
