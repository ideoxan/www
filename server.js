import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"
import * as build from "@remix-run/dev/server-build"

const handleRequest = createPagesFunctionHandler({
    build,
    mode: process.env.NODE_ENV,
    getLoadContext: context => context.env,
})

export function onRequest(context) {
    global.env = context.env
    return handleRequest(context)
}
