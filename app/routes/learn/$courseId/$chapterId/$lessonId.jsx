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

export const loader = async ({ params }) => {
    // TODO: use params.courseId, params.chapterId, params.lessonId to load the lesson from
    // TODO: supabase and serve it. (GraphQL?)
    return json({
        course: {
            name: "Intro to NodeJS (Testing Sample)",
            uuid: "07e68b9a-d10b-452f-acf7-53a200caecb3",
            description: "A sample course for testing the Ideoxan website using NodeJS",
            tags: ["nodejs", "testing", "javascript"],
            author: ["@ideoxan"],
        },
        chapter: {
            name: "Introduction",
            index: 0,
        },
        lesson: {
            name: "What is NodeJS?",
            index: 0,
            quiz: false,
            content: {
                guide: "Hello, World!",
                workspace: {
                    "index.js": "function sum(a, b) {\n  return a + b\n}\n\nconsole.log(sum(1, 2))",
                    "index.html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Document</title>\n</head>\n<body>\n<h1>Hello, World!</h1>\n<p>Welcome to my website!</p>\n</body>\n</html>",
                    "src/b.txt": "lol\n"
                }
            },
            tasks: [
                {
                    instructions: "Run the project",
                    completedByDefault: false,
                    conditions: [
                        {
                            type: "file",
                            file: "index.js",
                            content: "function sum(a, b) {\n  return a + b\n}\n\nconsole.log(sum(1, 2))",
                            is: "equal",
                        },
                        {
                            type: "run",
                            successful: true,
                        }
                    ]
                }
            ],
            environment: {
                tesseract: true,
                on: "node:latest",
                commands: [
                    "npm install",
                ],
                viewport: false,
                console: true
            },
            navigation: {
                next: [0, 1],
                previous: null,
            }
        }
    })
}

export default function Editor() {
    const metadata = useLoaderData()

    // States
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
    if (metadata.lesson.environment.viewport) {
        defaultOpenPreviewTabs.push({
            name: "Viewport",
        })
    }
    if (metadata.lesson.environment.console) {
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

            {/* Navigation Bar */}
            <EditorNavigationBar metadata={metadata} />

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
        </div>
    )
}
