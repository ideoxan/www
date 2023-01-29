import { json, redirect } from "@remix-run/cloudflare"
import { useLoaderData, useParams } from "@remix-run/react"
import { useEffect, useState } from "react"
import { BarLoader } from "react-spinners"
import { getAuthData } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"
import prodBlockServer from "app/utils/prodBlock.server"

import termStyles from "app/styles/xterm.css"
import Editor from "app/components/LearnApp/Editor"

export const links = () => [{ rel: "stylesheet", href: termStyles }]

export const meta = ({ data }) => {
    if (data?.metadata) {
        let title = `Lesson ${data?.metadata?.lesson?.index + 1}: ${
            data?.metadata?.lesson?.name
        } | ${data?.metadata?.course?.name} | Ideoxan`
        let description = `Empower your future. Learn computer science for free. Get started on your first "${data?.metadata?.course?.name}" lesson by creating an account on Ideoxan.`
        let image = `https://og-image.ideoxan.com/?ns=ix&lname=${encodeURIComponent(
            data?.metadata?.lesson?.name
        )}&desc=${encodeURIComponent(data?.metadata?.lesson?.description)}`

        return {
            title,
            description,
            image,
            // OG and Twitter
            "twitter:title": title,
            "twitter:description": description,
            "twitter:image": image,
            "og:title": title,
            "og:description": description,
            "og:image": image,
        }
    }
}

export const loader = async ({ params, request }) => {
    prodBlockServer()

    // Load basic metadata (don't pull any files yet so we can still load the page quick)
    let { data: lessonData, error: lessonDataQueryError } = await supabaseAdmin()
        .from("lessons")
        .select(
            "id, chapter(id, course(id, name, description, tags, authors), name, index), name, environment, guide, workspace, index, previous, next, description"
        )
        .eq("chapter.course.id", params.courseId)
        .eq("chapter.index", params.chapterId)
        .eq("index", params.lessonId)
        .maybeSingle()

    if (!lessonData) throw new Response("Not Found", { status: 404, statusText: "Not Found" })
    if (lessonDataQueryError) {
        if (global.env.WORKER_ENV !== "production") console.log(lessonDataQueryError)
        throw new Response("Internal Server Error", {
            status: 500,
            statusText: "Internal Server Error",
        })
    }

    // Move some objects around
    let metadata = {
        lesson: lessonData,
        chapter: { ...lessonData?.chapter }, // Clone
        course: { ...lessonData?.chapter?.course }, // Clone
    }
    delete metadata?.lesson?.chapter

    // Load the user data and session
    let { session, data: userData, error } = await getAuthData(request)
    // Redirect to login if invalid session
    if (error == "invalid_session") return redirect("/login", { headers: { "Set-Cookie": "" } })

    return json({ metadata, params, session, userData, error })
}

export default function LearnApplication() {
    // Lets load in the course metadata. If there is an error returned, our children must be
    // resilient against a lack of properly formatted metadata
    let { session, userData, metadata, error: loaderError } = useLoaderData() || {}
    if (loaderError || !metadata) throw new Error("loaderError")
    let params = useParams()

    // States
    // - Loading
    const [loading, setLoading] = useState(true)
    const [loadingScreen, setLoadingScreen] = useState(true)

    // Side Effects
    // - Loading
    useEffect(() => {
        if (!loading) setTimeout(() => setLoadingScreen(false), 1000)
    }, [loading])

    // Render
    return (
        <div className="flex h-full max-h-screen min-h-full flex-col overflow-hidden">
            {/* Loading Splash */}
            {loadingScreen && (
                <div className="absolute top-0 left-0 z-40 flex h-full w-full flex-col bg-gray-900">
                    <div className="m-auto flex flex-col px-6 py-4">
                        <p className="mx-auto text-center font-sans text-sm font-bold text-gray-50 text-opacity-80">
                            Loading
                        </p>
                        <BarLoader color="#6E2FFF" className="mt-4" height={5} width={220} />
                    </div>
                </div>
            )}
            {metadata?.lesson?.environment?.type == "editor_interactive" && (
                <Editor
                    metadata={metadata}
                    setLoading={setLoading}
                    params={params}
                    session={session}
                    userData={userData}
                    loading={loading}
                />
            )}
        </div>
    )
}
