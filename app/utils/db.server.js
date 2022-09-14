import { createClient } from "@supabase/supabase-js"

let instance = null

export const supabaseAdmin = ({ context }) => {
    if (instance) return instance

    let dbURL = null
    let dbKey = null

    if (!context.WORKER_ENV) throw new Error("Process is not defined")

    if (context.WORKER_ENV === "production") {
        dbURL = context.SUPABASE_URL
        dbKey = context.SUPABASE_SECRET_KEY
    } else {
        dbURL = context.SUPABASE_URL_DEV
        dbKey = context.SUPABASE_SECRET_KEY_DEV
    }

    if (!dbURL) throw new Error("Supabase URL is not set")
    if (!dbKey) throw new Error("Supabase key is not set")

    instance = createClient(dbURL, dbKey)

    return instance
}
