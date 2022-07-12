// General
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react"
// Navigation
import EditorNavigationBar from "app/components/Editor/EditorNavigationBar"
// Activities
import EditorActivitiesBar from "app/components/Editor/Activities/EditorActivitiesBar"
import availableActivities from "app/components/Editor/Activities/availableActivities"
// Status Bar
import EditorStatusBar from "app/components/Editor/EditorStatusBar"
// Code Editor
import EditorCodeArea from "app/components/Editor/CodeArea/EditorCodeArea"
import EditorTabContainer from "app/components/Editor/EditorTabContainer"
import { supabaseAdmin } from "app/utils/db.server.js"


export const loader = async ({ params }) => {
    //??: Would a graphql query be more efficient?
    // TODO: replace all public api calls with a url fetch
    const metadata = {}

    // URLs we use to get the course and lesson data
    const storageURL = `${ process.env.SUPABASE_URL || process.env.SUPABASE_URL_DEV }/storage/v1/object/public/course-content`

    const paddedChapterId = params.chapterId.padStart(2, "0")
    const paddedLessonId = params.lessonId.padStart(2, "0")

    // Get the course metadata
    try {
        // Append the course metadata to the metadata object
        let data = await fetch(`${ storageURL }/${ params.courseId }/course.json`)
        if (!data.ok) throw new Error(JSON.stringify(await data.json()))
        metadata.course = await data.json()
    } catch (error) {
        if (process.env.NODE_ENV !== "production") console.log(error)
        throw new Response("Not Found", {
            status: 404
        })
    }

    // Get the chapter metadata
    try {
        // Append the course metadata to the metadata object
        let data = await fetch(`${ storageURL }/${ params.courseId }/${ paddedChapterId }/chapter.json`)
        if (!data.ok) throw new Error(JSON.stringify(await data.json()))
        metadata.chapter = await data.json()
        metadata.chapter.index = params.chapterId
    } catch (error) {
        if (process.env.NODE_ENV !== "production") console.log(error)
        throw new Response("Not Found", {
            status: 404
        })
    }

    // Get the lesson metadata
    try {
        // Append the course metadata to the metadata object
        let data = await fetch(`${ storageURL }/${ params.courseId }/${ paddedChapterId }/${ paddedLessonId }/lesson.json`)
        if (!data.ok) throw new Error(JSON.stringify(await data.json()))
        metadata.lesson = await data.json()
        metadata.lesson.index = params.lessonId
    } catch (error) {
        if (process.env.NODE_ENV !== "production") console.log(error)
        throw new Response("Not Found", {
            status: 404
        })
    }

    // Set navigation properties
    metadata.lesson.navigation = {
        next: null,
        previous: null
    }

    if (metadata?.error) throw new Response(JSON.stringify(metadata), {
        status: 500
    })

    // Return the metadata
    return json(metadata)
}

export default function Editor() {
    // Lets load in the course metadata. If there is an error returned, our children must be
    // resilient against a lack of properly formatted metadata
    const metadata = useLoaderData()

    // States
    // - Loading
    const [loading, setLoading] = useState(true)
    // - Activities Sidebar
    const [activity, setActivity] = useState(0)
    // - Tabs
    const [openCodeTabs, setOpenCodeTabs] = useState([
        {
            name: "index.html"
        },
        {
            name: "index.js"
        },
        {
            name: "style.css"
        },
    ])
    const [activeCodeTab, setActiveCodeTab] = useState(openCodeTabs[0])
    let defaultOpenPreviewTabs = []
    if (metadata?.lesson?.environment?.viewport) {
        defaultOpenPreviewTabs.push({
            name: "Viewport",
        })
    }
    if (metadata?.lesson?.environment?.console) {
        defaultOpenPreviewTabs.push({
            name: "Console",
        })
    }
    const [openPreviewTabs, setOpenPreviewTabs] = useState(defaultOpenPreviewTabs)
    const [activePreviewTab, setActivePreviewTab] = useState(openPreviewTabs[0])
    const [openLessonGuideTabs, setOpenLessonGuideTabs] = useState([
        {
            name: "Lesson Guide",
        }
    ])
    const [activeLessonGuideTab, setActiveLessonGuideTab] = useState(openLessonGuideTabs[0])

    // Render
    return (
        <div className="flex flex-col max-h-screen h-screen min-h-screen overflow-hidden">

            {metadata?.lesson?.environment?.type == "editor_interactive" && (<>
                {/* Navigation Bar */}
                < EditorNavigationBar metadata={metadata} />

                <main className="flex flex-row flex-grow w-full">
                    <div className="h-full w-1/6 flex flex-row">
                        {/* Activities Bar */}
                        <EditorActivitiesBar
                            availableActivities={availableActivities}
                            activity={activity}
                            setActivity={setActivity}
                        />

                        {/* Left Sidebar */}
                        <div className="h-full flex flex-col px-3 py-3 w-full bg-gray-700 border-r border-r-gray-500 border-opacity-20">
                            {availableActivities.map((item, index) => {
                                let Sidebar = item.content
                                return (
                                    <div key={index} hidden={activity !== index}>
                                        {Sidebar && (<Sidebar
                                            metadata={metadata}
                                        />)}
                                    </div>
                                )
                            })}

                        </div>

                    </div >

                    <div className="flex flex-col h-full w-3/6" >
                        {/* Editor Code Tabs */}
                        <EditorTabContainer
                            openTabs={openCodeTabs}
                            setOpenTabs={setOpenCodeTabs}
                            activeTab={activeCodeTab}
                            setActiveTab={setActiveCodeTab}
                        />
                        {/* Editor Code Area */}
                        <div className="flex flex-col max-h-full h-full w-full px-2 pb-2">
                            <EditorCodeArea />
                        </div>
                    </div>

                    {/* Editor Right Sidebar */}
                    <div className="flex flex-col h-full w-2/6">
                        {/* Editor Preview Area */}
                        <div className="flex flex-col h-2/5 w-full">
                            {/* Editor Preview Tabs */}
                            <EditorTabContainer
                                openTabs={openPreviewTabs}
                                setOpenTabs={setOpenPreviewTabs}
                                activeTab={activePreviewTab}
                                setActiveTab={setActivePreviewTab}
                            />
                        </div>
                        {/* Editor Lesson Guide Area */}
                        <div className="flex flex-col h-3/5 w-full">
                            {/* Editor Lesson Guide Tabs */}
                            <EditorTabContainer
                                openTabs={openLessonGuideTabs}
                                setOpenTabs={setOpenLessonGuideTabs}
                                activeTab={activeLessonGuideTab}
                                setActiveTab={setActiveLessonGuideTab}
                            />
                        </div>
                    </div>
                </main>

                <EditorStatusBar />
            </>)}
        </div>
    )
}
