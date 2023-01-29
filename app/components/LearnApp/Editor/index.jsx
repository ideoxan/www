import LearnAppNavigationBar from "app/components/LearnApp/LearnAppNavigationBar"
import CodeEditor from "app/components/LearnApp/Editor/CodeEditor"
import TabContainer from "app/components/LearnApp/Editor/TabContainer"
import { marked } from "marked"
import FileSystem from "app/utils/fs.client"
import Workspace from "app/components/LearnApp/Editor/ActivitiesSidebar/Workspace/"
import Terminal from "app/components/LearnApp/Editor/Terminal.client"
import { useEffect, useRef, useState } from "react"
import Icon from "app/components/Icon"
import supportedLanguages from "app/components/LearnApp/Editor/supportedLanguages"
import { dependencies } from "package.json"

export default function Editor({
    metadata,
    setLoading,
    params,
    session,
    userData,
    loading,
    ...props
}) {
    const terminalRef = useRef(null)
    const codeEditorRef = useRef(null)
    const monacoRef = useRef(null)

    const [currentSidebarActivity, setCurrentSidebarActivity] = useState(0)
    const [openCodeEditorTabs, setOpenCodeEditorTabs] = useState([])
    const [activeCodeEditorTab, setActiveCodeEditorTab] = useState(-1)

    const [codeEditorLanguage, setCodeEditorLanguage] = useState("plaintext")

    let [connected, setConnected] = useState(true)
    let [pos, setPos] = useState({ lineNumber: 1, column: 1 })

    // Update cursor position
    codeEditorRef.current?.onDidChangeCursorPosition(e => setPos(e.position))

    useEffect(() => {
        setInterval(() => {
            setConnected(navigator.onLine)
        }, 3000)
    }, [])

    // Side Effects
    // - Loading
    useEffect(() => {
        fetchData()

        async function fetchData() {
            setLoading(true)
            // URLs we use to get the course and lesson data
            const storageURL = `${window.env.SUPABASE_URL}/storage/v1/object/public/`
            const paddedChapterId = params?.chapterId?.padStart(2, "0")
            const paddedLessonId = params?.lessonId?.padStart(2, "0")

            if (!paddedChapterId || !paddedLessonId) {
                setLoading(false)
                window.location.href = "/404"
            }

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
                //setOpenPreviewTabs(_starterPreviewTabs)

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
                window.location.href = "/404"
            }

            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metadata, params])

    const availableActivities = [
        {
            name: "Workspace",
            icon: "Folder",
            component: Workspace,
        },
        {
            name: "Course Info",
            icon: "BookOpen",
            component: null,
        },
        {
            name: "Settings",
            icon: "Settings",
            component: null,
        },
    ]

    const statusBarItems = {
        left: [
            {
                name: "@ideoxan/balkan-netstatus",
                content: connected ? "Connected to Ideoxan" : "Disconnected (Check your internet)",
            },
            {
                name: "@ideoxan/balkan-ver",
                content: `Balkan IDE ${(global || window)?.env?.CF_PAGES_BRANCH ?? "unknown"}@
                ${(global || window)?.env?.CF_PAGES_COMMIT_SHA?.substring(0, 7) ?? "INVALID"}`,
            },
            {
                name: "@ideoxan/monaco-ver",
                content: `Monaco React v${dependencies["@monaco-editor/react"].substring(1)}`,
            },
        ],
        right: [
            {
                name: "@ideoxan/monaco-cursorpos",
                content: `Ln ${pos.lineNumber}, Col ${pos.column}`,
            },
            {
                name: "@ideoxan/monaco-language",
                content:
                    supportedLanguages[codeEditorLanguage]?.name ||
                    supportedLanguages["plaintext"].name,
            },
            {
                name: "@ideoxan/monaco-indentation",
                content: `Tab Size: ${codeEditorRef.current?.getOptions().tabSize ?? 4}
                ${codeEditorRef.current?.getOptions().insertSpaces ? "Spaces" : "Tabs"}`,
            },
            {
                name: "@ideoxan/monaco-textencoding-status",
                content: "UTF-8",
            },
        ],
    }

    // Render
    return (
        !loading && (
            <>
                {/* Navigation Bar */}
                <LearnAppNavigationBar metadata={metadata} />

                <main className="flex max-h-full w-full flex-grow flex-row overflow-hidden">
                    <div className="flex h-full max-h-full w-1/6 flex-row overflow-hidden">
                        {/* Activities Bar */}
                        <div className="flex h-full flex-col border-r border-r-gray-500 border-opacity-20 bg-gray-700 px-3 py-3">
                            {availableActivities.map(({ name, icon }, i) => (
                                <button
                                    key={i}
                                    className={
                                        "mb-2 flex h-10 w-10 cursor-pointer rounded-md bg-gray-900 p-2 " +
                                        (currentSidebarActivity == i
                                            ? "bg-opacity-100 "
                                            : "bg-opacity-0 opacity-50 hover:opacity-100 ")
                                    }
                                    onClick={() => {
                                        setCurrentSidebarActivity(i)
                                    }}>
                                    <Icon
                                        name={icon}
                                        width={4}
                                        height={4}
                                        color="gray-50"
                                        strokeThickness={2}
                                        className="m-auto"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Left Sidebar */}
                        <div className="flex h-full max-h-full w-full flex-col overflow-scroll border-r border-r-gray-500 border-opacity-20 bg-gray-700 px-3 py-3">
                            {availableActivities.map(({ name, icon, component: Component }, i) => (
                                <div
                                    key={i}
                                    hidden={currentSidebarActivity !== 0}
                                    className="h-full max-h-full w-full">
                                    {Component && (
                                        <Component
                                            metadata={metadata}
                                            fs={FileSystem}
                                            openCodeTabs={openCodeEditorTabs}
                                            setOpenCodeTabs={setOpenCodeEditorTabs}
                                            activeCodeTab={activeCodeEditorTab}
                                            setActiveCodeTab={setActiveCodeEditorTab}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex h-full w-3/6 flex-col">
                        {/* Editor Code Tabs */}
                        <TabContainer
                            openTabs={openCodeEditorTabs}
                            setOpenTabs={setOpenCodeEditorTabs}
                            activeTab={activeCodeEditorTab}
                            setActiveTab={setActiveCodeEditorTab}
                            className="pl-2"
                        />
                        {/* Editor Code Area */}
                        <div className="flex h-full max-h-full w-full flex-col px-2 pb-2">
                            <CodeEditor
                                hidden={openCodeEditorTabs.length <= 0}
                                onChange={() => {}}
                                fs={FileSystem}
                                activeCodeTab={activeCodeEditorTab}
                                openCodeTabs={openCodeEditorTabs}
                                lang={codeEditorLanguage}
                                setLang={setCodeEditorLanguage}
                                editorRef={codeEditorRef}
                                monacoRef={monacoRef}
                            />
                            <div
                                className={
                                    "h-full w-full flex-col items-center justify-center " +
                                    (openCodeEditorTabs.length <= 0 ? "flex" : "hidden")
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
                            {/* <EditorTabContainer
                                openTabs={openPreviewTabs}
                                setOpenTabs={setOpenPreviewTabs}
                                activeTab={activePreviewTab}
                                setActiveTab={setActivePreviewTab}
                            /> */}
                            {/* Editor Preview Area */}
                            <div className="flex max-h-full w-full flex-shrink flex-grow flex-col py-2 pr-2">
                                <Terminal
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

                <footer className="flex w-full flex-shrink-0 flex-row border-t border-t-gray-500 border-opacity-20 bg-gray-700 py-1 px-6">
                    <div className="mr-auto flex flex-row space-x-8">
                        {statusBarItems.left.map(({ content }, i) => (
                            <div className="flex w-max flex-row" key={i}>
                                <p className="text-left font-sans text-3xs font-semibold tracking-tight text-gray-50 opacity-50">
                                    {content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="ml-auto flex flex-row space-x-8">
                        {statusBarItems.right.map(({ content }, i) => (
                            <div className="flex w-max flex-row" key={i}>
                                <p className="text-right font-sans text-3xs font-semibold tracking-tight text-gray-50 opacity-50">
                                    {content}
                                </p>
                            </div>
                        ))}
                    </div>
                </footer>
            </>
        )
    )
}
