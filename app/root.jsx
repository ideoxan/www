import { json } from "@remix-run/node"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react"

import styles from 'app/styles/app.css'

export const meta = () => ({
    charset: "utf-8",
    lang: "en",
    viewport: "width=device-width,initial-scale=1",

    // SEO
    title: "Ideoxan",
    description: "&#128105;&#8205;&#128187; Ideoxan is a free to use online tool to learn programming.",
    keywords: "programming, learn how to code, free, coding, software, developer",

    // OG and Twitter
    "twitter:card": "summary_large_image",
    "twitter:url": "https://ideoxan.com",
    "twitter:title": "Ideoxan",
    "twitter:description": "👩‍💻 Ideoxan is a free to use online tool to learn programming.",
    "twitter:image": "https://next.ideoxan.com/images/ix_og_embed_1200x628.png",
    "og:type": "website",
    "og:url": "https://ideoxan.com",
    "og:title": "Ideoxan",
    "og:description": "👩‍💻 Ideoxan is a free to use online tool to learn programming.",
    "og:image": "https://next.ideoxan.com/images/ix_og_embed_1200x628.png",
    "image": "https://next.ideoxan.com/images/ix_og_embed_1200x628.png",
    "msapplication-TileColor": "#6e2fff",
    "theme-color": "#6e2fff",
})

export function links() {
    return [{ rel: "stylesheet", href: styles }]
}

export async function loader({ request }) {
    // This injects the env vars into the browser
    if (process.env.NODE_ENV === "production") {
        return json({
            ENV: {
                SUPABASE_URL: process.env.SUPABASE_URL,
                SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
            }
        })
    } else {
        return json({
            ENV: {
                SUPABASE_URL_DEV: process.env.SUPABASE_URL_DEV,
                SUPABASE_ANON_KEY_DEV: process.env.SUPABASE_ANON_KEY_DEV,
            }
        })
    }
}

export default function App() {
    let loaderData = useLoaderData()

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
                <link rel="manifest" href="/site.webmanifest"></link>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6f2bff"></link>
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <script dangerouslySetInnerHTML={{
                    __html: `window.env = ${ JSON.stringify(loaderData.ENV) }`
                }} />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
