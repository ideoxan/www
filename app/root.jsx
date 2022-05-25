import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react"

import styles from 'app/styles/app.css'

export const meta = () => ({
    charset: "utf-8",
    title: "Ideoxan",
    viewport: "width=device-width,initial-scale=1",
    "http-equiv:X-UA-Compatible": "ie=edge",
    "msapplication-TileColor": "#da532c",
    "theme-color": "#ffffff",
    description: "👩‍💻 Ideoxan is a free to use online tool to learn programming."
})

export function links() {
    return [{ rel: "stylesheet", href: styles }]
}

export default function App() {
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
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
