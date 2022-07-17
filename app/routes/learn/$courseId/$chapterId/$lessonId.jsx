// General
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
// Navigation
import EditorNavigationBar from "app/components/Editor/EditorNavigationBar"
// Activities
import EditorActivitiesBar from "app/components/Editor/Activities/EditorActivitiesBar"
// Status Bar
import EditorStatusBar from "app/components/Editor/EditorStatusBar"
// Code Editor
import EditorCodeArea from "app/components/Editor/CodeArea/EditorCodeArea"
import EditorTabContainer from "app/components/Editor/EditorTabContainer"
import { BarLoader } from "react-spinners"
import { marked } from "marked"
import FileSystem from "app/utils/fs.client"
import EditorActivityWorkspace from "app/components/Editor/Activities/Workspace/EditorActivityWorkspace"


export const loader = async ({ params }) => {
    // It slows down the website a lot if we start loading the data from the server
    // At least if we handle it manually in the component, we can show a loading splash screen.
    //??: Would a graphql query be more efficient?
    return json({ params })
}

export default function Editor() {
    // Lets load in the course metadata. If there is an error returned, our children must be
    // resilient against a lack of properly formatted metadata
    let data = useLoaderData()
    let { params } = data

    // States
    // - Metadata
    const [metadata, setMetadata] = useState({})
    // - Loading
    const [loading, setLoading] = useState(true)
    const [loadingScreen, setLoadingScreen] = useState(true)
    // - Activities Sidebar
    const [activity, setActivity] = useState(0)
    // - Code Area Tabs
    const [openCodeTabs, setOpenCodeTabs] = useState([
        {
            name: "index.html",
            path: "/index.html",
        },
        {
            name: "index.js",
            path: "/index.js",
        },
    ])
    const [activeCodeTab, setActiveCodeTab] = useState(0)
    // - Preview Area Tabs
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
    const [activePreviewTab, setActivePreviewTab] = useState(0)

    // Side Effects
    // - Loading
    useEffect(() => {
        fetchData()

        async function fetchData() {
            setLoading(true)
            setLoadingScreen(true)
            let _meta = {}
            // URLs we use to get the course and lesson data
            const storageURL = `${ window.env.SUPABASE_URL || window.env.SUPABASE_URL_DEV }/storage/v1/object/public/course-content`

            const paddedChapterId = params.chapterId.padStart(2, "0")
            const paddedLessonId = params.lessonId.padStart(2, "0")

            // Get the course metadata
            try {
                // Append the course metadata to the metadata object
                let data = await fetch(`${ storageURL }/${ params.courseId }/course.json`)
                if (!data.ok) throw new Error(JSON.stringify(await data.json()))
                _meta.course = await data.json()
            } catch (error) {
                if (window.env.NODE_ENV !== "production") console.log(error)
                throw new Response("Not Found", {
                    status: 404
                })
            }

            // Get the chapter metadata
            try {
                // Append the course metadata to the metadata object
                let data = await fetch(`${ storageURL }/${ params.courseId }/${ paddedChapterId }/chapter.json`)
                if (!data.ok) throw new Error(JSON.stringify(await data.json()))
                _meta.chapter = await data.json()
                _meta.chapter.index = parseInt(params.chapterId)
            } catch (error) {
                if (window.env.NODE_ENV !== "production") console.log(error)
                throw new Response("Not Found", {
                    status: 404
                })
            }

            // Get the lesson metadata
            try {
                // Append the course metadata to the metadata object
                let data = await fetch(`${ storageURL }/${ params.courseId }/${ paddedChapterId }/${ paddedLessonId }/lesson.json`)
                if (!data.ok) throw new Error(JSON.stringify(await data.json()))
                _meta.lesson = await data.json()
                _meta.lesson.index = parseInt(params.lessonId)
            } catch (error) {
                if (window.env.NODE_ENV !== "production") console.log(error)
                throw new Response("Not Found", {
                    status: 404
                })
            }

            // Set navigation properties
            _meta.lesson.navigation = {
                next: null,
                previous: null
            }

            if (_meta?.error) throw new Response(JSON.stringify(_meta), {
                status: 500
            })
            setMetadata(_meta)

            // Construct filesystem
            // Go through the lesson metadata and add the files to the filesystem
            for (let file of Object.keys(_meta.lesson.content.workspace)) {
                await FileSystem.writeFile({
                    filePath: file,
                    content: _meta.lesson.content.workspace[file]
                })
            }

            setLoading(false)

            setTimeout(() => {
                setLoadingScreen(false)
            }, 1000)
        }
    }, [params])

    // Render
    return (
        <div className="flex flex-col max-h-full h-full min-h-full overflow-hidden">
            { /* Loading Splash */}
            {loadingScreen && (
                <div className="absolute z-40 top-0 left-0 flex flex-col w-full h-full bg-gray-900">
                    <div className="flex flex-col m-auto px-6 py-4">
                        <p className="font-sans font-bold text-sm text-center text-gray-50 text-opacity-80 mx-auto">Loading</p>
                        <BarLoader color="#6E2FFF" className="mt-4" height={5} width={220} />
                    </div>
                </div>
            )}
            {!loading && metadata?.lesson?.environment?.type == "editor_interactive" && (<>
                {/* Navigation Bar */}
                < EditorNavigationBar metadata={metadata} />

                <main className="flex flex-row flex-grow w-full">
                    <div className="h-full w-1/6 flex flex-row">
                        {/* Activities Bar */}
                        <EditorActivitiesBar
                            activity={activity}
                            setActivity={setActivity}
                        />

                        {/* Left Sidebar */}
                        <div className="h-full flex flex-col px-3 py-3 w-full bg-gray-700 border-r border-r-gray-500 border-opacity-20">
                            <div hidden={activity !== 0}>
                                <EditorActivityWorkspace
                                    metadata={metadata}
                                    fs={FileSystem}
                                    openCodeTabs={openCodeTabs}
                                    setOpenCodeTabs={setOpenCodeTabs}
                                    activeCodeTab={activeCodeTab}
                                    setActiveCodeTab={setActiveCodeTab}
                                />
                            </div>
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
                            {/* Editor Lesson Guide Area */}
                            <div className="flex flex-col max-h-full h-full w-full pr-2 pb-2">
                                <div className="react-markdown flex flex-col max-h-full h-full w-full rounded-lg ring-1 ring-gray-500 ring-opacity-20 shadow-xl bg-gray-700 px-4 py-4">
                                    <h1>Lessson {metadata.lesson.index + 1}: {metadata.lesson.name}</h1>
                                    <h6>Chapter {metadata.chapter.index + 1}<span className="mx-2">|</span>{metadata.course.name}</h6>
                                    <div className="react-markdown w-full mb-6" dangerouslySetInnerHTML={{
                                        __html: marked.parse(metadata?.lesson?.content?.guide)
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <EditorStatusBar />
            </>)}
        </div>
    )
}
