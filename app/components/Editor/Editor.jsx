// Navigation
import EditorNavigationBar from "app/components/Editor/EditorNavigationBar"
// Activities
import EditorActivitiesBar from "app/components/Editor/Activities/EditorActivitiesBar"
// Status Bar
import EditorStatusBar from "app/components/Editor/EditorStatusBar"
// Code Editor
import EditorCodeArea from "app/components/Editor/CodeArea/EditorCodeArea"
import EditorTabContainer from "app/components/Editor/EditorTabContainer"
import { marked } from "marked"
import FileSystem from "app/utils/fs.client"
import EditorActivityWorkspace from "app/components/Editor/Activities/Workspace/EditorActivityWorkspace"
import Console from "app/components/Editor/Preview/Console/Console.client"
import { useEffect, useState } from "react"

export default function Editor({
    metadata,
    setLoading,
    setLoadingScreen,
    params,
    session,
    userData,
    loading,
    ...props
}) {
    // States
    // - Activities Sidebar
    const [activity, setActivity] = useState(0)
    // - Code Area Tabs
    const [openCodeTabs, setOpenCodeTabs] = useState([])
    const [activeCodeTab, setActiveCodeTab] = useState(-1)
    // - Preview Area Tabs
    const [openPreviewTabs, setOpenPreviewTabs] = useState([])
    const [activePreviewTab, setActivePreviewTab] = useState(0)

    // Side Effects
    // - Loading
    useEffect(() => {
        fetchData()

        async function fetchData() {
            setLoading(true)
            setLoadingScreen(true)
            // URLs we use to get the course and lesson data
            const storageURL = `${window.env.SUPABASE_URL}/storage/v1/object/public/`
            const paddedChapterId = params.chapterId.padStart(2, "0")
            const paddedLessonId = params.lessonId.padStart(2, "0")

            try {
                // Change UI states
                let _starterPreviewTabs = []
                if (metadata.lesson.environment.viewport)
                    _starterPreviewTabs.push({
                        name: "Preview",
                    })
                if (metadata.lesson.environment.console)
                    _starterPreviewTabs.push({
                        name: "Console",
                    })
                setOpenPreviewTabs(_starterPreviewTabs)

                // Construct filesystem
                // Go through the lesson metadata and add the files to the filesystem
                let tarball = await (
                    await fetch(`${storageURL}${metadata.lesson.workspace}`)
                ).arrayBuffer()
                await FileSystem.unpack({
                    dirPath: "/",
                    tarFile: tarball,
                })

                // Get the lesson guide
                metadata.lesson.guide = await (
                    await fetch(`${storageURL}${metadata.lesson.guide}`)
                ).text()
            } catch (error) {
                if (window.env.WORKER_ENV !== "production") console.log(error)
                setLoading(false)
                setLoadingScreen(false)
                window.location.href = "/404"
            }

            setLoading(false)

            setTimeout(() => {
                setLoadingScreen(false)
            }, 1000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metadata, params])

    return (
        !loading && (
            <>
                {/* Navigation Bar */}
                <EditorNavigationBar metadata={metadata} />

                <main className="flex max-h-full w-full flex-grow flex-row overflow-hidden">
                    <div className="flex h-full max-h-full w-1/6 flex-row overflow-hidden">
                        {/* Activities Bar */}
                        <EditorActivitiesBar activity={activity} setActivity={setActivity} />

                        {/* Left Sidebar */}
                        <div className="flex h-full max-h-full w-full flex-col overflow-scroll border-r border-r-gray-500 border-opacity-20 bg-gray-700 px-3 py-3">
                            <div hidden={activity !== 0} className="h-full max-h-full w-full">
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
                    </div>

                    <div className="flex h-full w-3/6 flex-col">
                        {/* Editor Code Tabs */}
                        <EditorTabContainer
                            openTabs={openCodeTabs}
                            setOpenTabs={setOpenCodeTabs}
                            activeTab={activeCodeTab}
                            setActiveTab={setActiveCodeTab}
                            className="pl-2"
                        />
                        {/* Editor Code Area */}
                        <div className="flex h-full max-h-full w-full flex-col px-2 pb-2">
                            <EditorCodeArea
                                hidden={openCodeTabs.length <= 0}
                                onChange={() => {}}
                                fs={FileSystem}
                                activeCodeTab={activeCodeTab}
                                openCodeTabs={openCodeTabs}
                            />
                            <div
                                className={
                                    "h-full w-full flex-col items-center justify-center " +
                                    (openCodeTabs.length <= 0 ? "flex" : "hidden")
                                }>
                                <img
                                    className="w-48 opacity-5"
                                    src="/images/ix_icon_flat_white_trans_250x250.png"
                                    alt=""
                                />
                                <p className="mt-8 text-center font-sans text-sm font-medium text-gray-50 opacity-20">
                                    To open a file, click on any item to the left
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Editor Right Sidebar */}
                    <div className="flex h-full w-2/6 flex-col">
                        {/* Editor Preview Area */}
                        <div className="flex h-2/5 w-full flex-col">
                            {/* Editor Preview Tabs */}
                            <EditorTabContainer
                                openTabs={openPreviewTabs}
                                setOpenTabs={setOpenPreviewTabs}
                                activeTab={activePreviewTab}
                                setActiveTab={setActivePreviewTab}
                            />
                            {/* Editor Preview Area */}
                            <div className="flex h-full w-full flex-col pr-2 pb-2">
                                <Console
                                    session={session}
                                    userData={userData}
                                    metadata={metadata}
                                    fs={FileSystem}
                                />
                            </div>
                        </div>
                        {/* Editor Lesson Guide Area */}
                        <div className="flex h-3/5 w-full flex-col">
                            {/* Editor Lesson Guide Area */}
                            <div className="flex h-full max-h-full w-full flex-shrink flex-col overflow-y-scroll pr-2 pb-2">
                                <div className="react-markdown flex h-full max-h-full w-full flex-shrink flex-col rounded-lg bg-gray-700 px-6 py-4 shadow-xl ring-1 ring-gray-500 ring-opacity-20">
                                    <h1>
                                        Lesson {metadata.lesson.index + 1}: {metadata.lesson.name}
                                    </h1>
                                    <h6>
                                        Chapter {metadata.chapter.index + 1}
                                        <span className="mx-2">|</span>
                                        {metadata.course.name}
                                    </h6>
                                    <div
                                        className="react-markdown mb-6 w-full flex-shrink"
                                        dangerouslySetInnerHTML={{
                                            __html: marked.parse(metadata?.lesson?.guide),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <EditorStatusBar />
            </>
        )
    )
}
