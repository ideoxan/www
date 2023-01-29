import { json } from "@remix-run/cloudflare"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useCatch,
} from "@remix-run/react"
import GTag from "app/components/Shared/GTag"
import SchemaJSONLD from "app/components/Shared/SchemaJSONLD"

import styles from "app/styles/app.css"

export const meta = () => {
    let title = "Ideoxan"
    let description =
        "Empower your future. Get started today with interactive programming lessons. Learn at your own pace at zero cost."
    let image = "/images/ix_og_embed_1200x628.png"

    return {
        charset: "utf-8",
        lang: "en",
        viewport: "width=device-width, initial-scale=1",

        // SEO
        title: "Ideoxan",
        description,
        image,
        keywords:
            "programming,learn how to code,free,coding,software,developer,coding bootcamp,coding for kids,coding boot camps,scratch coding,what is coding,python coding,cracking the coding interview,coding classes,coding games,coding languages,coding jobs,ninja coding,kids coding languages,coding computers,free coding camp,best coding bootcamps,coding websites,coding for websites,coding classes for kids,minecraft coding,coding games for kids,coding for beginners,learn coding,free coding classes,computer coding,how to learn coding,object oriented programming,dynamic programming,rust programming language,computer programming,programming languages,c++ programming,c programming,lms,lms schoology,canvas lms,lms login,lms for schools,lms schools,website coding classroom plan,c programming tutorial,java programming tutorial,dynamic programming tutorial,java programming tutorial for beginners",

        // OG and Twitter
        "twitter:card": "summary_large_image",
        "twitter:url": "https://ideoxan.com",
        "twitter:title": title,
        "twitter:description": description,
        "twitter:image": image,
        "og:type": "website",
        "og:url": "https://ideoxan.com",
        "og:title": title,
        "og:description": description,
        "og:image": image,
        "msapplication-TileColor": "#6e2fff",
        "theme-color": "#6e2fff",
    }
}

export function links() {
    return [{ rel: "stylesheet", href: styles }]
}

export async function loader() {
    // This injects the env vars into the browser
    return json({
        ENV: {
            SUPABASE_URL: global.env.SUPABASE_URL,
            SUPABASE_ANON_KEY: global.env.SUPABASE_ANON_KEY,
            WORKER_ENV: global.env.WORKER_ENV,
            TESSERACT_URL: global.env.TESSERACT_URL,
            GA_TRACKING_ID: global.env.GA_TRACKING_ID,
            CF_PAGES_COMMIT_SHA: global.env.CF_PAGES_COMMIT_SHA,
            CF_PAGES_BRANCH: global.env.CF_PAGES_BRANCH,
        },
    })
}

export function CatchBoundary() {
    const caught = useCatch()

    if (caught.data == "WIP") {
        return (
            <html lang="en" className="h-full w-full">
                <head>
                    <Meta />
                    <Links />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"></link>
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"></link>
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"></link>
                    <link rel="manifest" href="/site.webmanifest"></link>
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6f2bff"></link>
                    <GTag />
                    <SchemaJSONLD />
                </head>
                <body className="flex h-full w-full flex-col">
                    <div className="m-auto flex flex-col">
                        <h1 className="glow-text-white mx-auto pb-2 text-center font-sans text-6xl font-extrabold tracking-tight">
                            Work in Progress
                        </h1>
                        <h2 className="mx-auto mt-4 text-center font-sans text-lg font-semibold tracking-tight text-gray-50 opacity-80">
                            This page is coming soon. Check back later.
                        </h2>
                        <a
                            href="/"
                            className="bttn bttn-round bttn-normal bttn-gradient box-glow-hover mx-auto mt-6">
                            Go Home
                        </a>
                    </div>
                    <ScrollRestoration />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.env = null`,
                        }}
                    />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        )
    } else {
        return (
            <html lang="en" className="h-full w-full">
                <head>
                    <Meta />
                    <Links />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"></link>
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"></link>
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"></link>
                    <link rel="manifest" href="/site.webmanifest"></link>
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6f2bff"></link>
                    <GTag />
                    <SchemaJSONLD />
                </head>
                <body className="flex h-full w-full flex-col">
                    <div className="m-auto flex flex-col">
                        <h1 className="glow-text-white mx-auto text-center font-sans text-6xl font-extrabold tracking-tight">
                            {caught.status}
                        </h1>
                        <h2 className="mx-auto mt-4 text-center font-sans text-lg font-semibold tracking-tight text-gray-50 opacity-80">
                            {caught.statusText}
                        </h2>
                        <a
                            href="/"
                            className="bttn bttn-round bttn-normal bttn-gradient box-glow-hover mx-auto mt-6">
                            Go Home
                        </a>
                    </div>
                    <ScrollRestoration />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.env = null`,
                        }}
                    />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        )
    }
}

export default function App() {
    let loaderData = useLoaderData()

    return (
        <html lang="en" className="h-full w-full">
            <head>
                <Meta />
                <Links />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
                <link rel="manifest" href="/site.webmanifest"></link>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6f2bff"></link>
                <GTag />
                <SchemaJSONLD />
            </head>
            <body className="h-full w-full">
                <Outlet />
                <ScrollRestoration />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.env = ${JSON.stringify(loaderData.ENV)}`,
                    }}
                />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
