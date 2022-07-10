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
    const metadata = {}

    // URLs we use to get the course and lesson data
    const courseMetaURL = `${ params.courseId }/course.json`
    const chapterMetaURL = `${ params.courseId }/${ params.chapterId.padStart(2, '0') }/chapter.json`
    const lessonMetaURL = `${ params.courseId }/${ params.chapterId.padStart(2, '0') }/${ params.lessonId.padStart(2, '0') }/lesson.json`

    // Get the course metadata
    const { data: courseData, error: courseDataError } = await supabaseAdmin.storage
        .from('course-content')
        .download(courseMetaURL)
    if (courseDataError || !courseData || !(courseData instanceof Blob))
        throw new Response("Not Found", {
            status: 404
        })
    // Append the course metadata to the metadata object
    metadata.course = JSON.parse(await courseData.text())

    // Get the chapter metadata
    const { data: chapterData, error: chapterDataError } = await supabaseAdmin.storage
        .from('course-content')
        .download(chapterMetaURL)
    if (chapterDataError || !chapterData || !(chapterData instanceof Blob))
        throw new Response("Not Found", {
            status: 404
        })
    // Append the chapter metadata to the metadata object
    metadata.chapter = JSON.parse(await chapterData.text())
    metadata.chapter.index = params.chapterId

    // Get the lesson metadata
    const { data: lessonData, error: lessonDataError } = await supabaseAdmin.storage
        .from('course-content')
        .download(lessonMetaURL)
    if (lessonDataError || !lessonData || !(lessonData instanceof Blob))
        throw new Response("Not Found", {
            status: 404
        })
    // Append the lesson metadata to the metadata object
    metadata.lesson = JSON.parse(await lessonData.text())
    metadata.lesson.index = params.lessonId


    // Time to figure out navigation. Arrays consist of [<chapter>, <lesson>] (no padding)
    let nextNav = []
    let prevNav = []

    // Lets see if there is a next lesson in this chapter
    const { data: currentLessonListing, error: currentLessonListingError } = await supabaseAdmin.storage
        .from('course-content')
        .list(`${ params.courseId }/${ params.chapterId }/`)
    if (currentLessonListingError || !currentLessonListing)
        return json({
            error: "Error loading course content",
            message: currentLessonListingError?.message,
            content: `Listing: ${ params.courseId }/${ params.chapterId }/`
        })

    // Filter out non-lesson folders and put them in an array
    let availableCurrentLessons = currentLessonListing
        .filter(object => object.id == null && !Number.isNaN(parseInt(object.name)))
        .map(object => {
            return parseInt(object.name)
        })

    if (availableCurrentLessons.length - 1 > parseInt(params.lessonId)) {
        // If there is a next lesson, lets increase the index by one
        nextNav = [parseInt(params.chapterId), parseInt(params.lessonId) + 1]

    } else {

        // Otherwise we check if there is a next chapter
        const { data: nextChaptersListing, error: nextChaptersListingError } = await supabaseAdmin.storage
            .from('course-content')
            .list(`${ params.courseId }/`)
        if (nextChaptersListingError || !nextChaptersListing)
            return json({
                error: "Error loading course content",
                message: nextChaptersListingError?.message,
                content: `Listing: ${ params.courseId }/`
            })
        // Filter out non-chapter folders and put them in an array
        let availableNextChapters = nextChaptersListing
            .filter(object => object.id == null && !Number.isNaN(parseInt(object.name)))
            .map(chapter => {
                return parseInt(chapter.name)
            })

        if (availableNextChapters.length - 1 > parseInt(params.chapterId)) {
            // If there is a next chapter, lets increase the chapter index by one, reset the lesson
            // index to 0
            nextNav = [parseInt(params.chapterId) + 1, 0]

        } else {
            // If there is no next chapter, we are at the end of the course. Congrats!
            nextNav = null
        }
    }

    // Now to figure out the previous lesson (this doesn't rely on data discovered/not discovered
    // in the search for a next lesson)
    if (parseInt(params.lessonId) > 0) {
        // If there is a previous lesson, lets decrease the index by one
        prevNav = [parseInt(params.chapterId), parseInt(params.lessonId) - 1]
    } else {
        // Otherwise we fall back a chapter
        if (parseInt(params.chapterId) > 0) {
            // If there is a previous chapter, lets decrease the chapter index by one...
            const { data: prevLessonListing, error: prevLessonListingError } = await supabaseAdmin.storage
                .from('course-content')
                .list(`${ params.courseId }/${ (parseInt(params.chapterId) + 1).toString().padStart(2, '0') }/`)
            if (prevLessonListingError || !prevLessonListing)
                return json({
                    error: "Error loading course content",
                    message: prevLessonListingError?.message,
                    content: `Listing: ${ params.courseId }/${ (parseInt(params.chapterId) + 1).toString().padStart(2, '0') }/`
                })

            // Filter out non-lesson folders and put them in an array
            let availablePrevLessons = prevLessonListing
                .filter(object => object.id == null && !Number.isNaN(parseInt(object.name)))
                .map(object => {
                    return parseInt(object.name)
                })

            // Now we can figure out what the last lesson in the previous chapter is and set the
            // lesson index to that
            prevNav = [parseInt(params.chapterId) - 1, availablePrevLessons.length - 1]

        } else {
            // If there is no previous chapter, we are at the beginning of the course. :(
            prevNav = null
        }
    }

    // Set navigation properties
    metadata.lesson.navigation = {
        next: nextNav,
        previous: prevNav
    }

    // TODO: workspace
    // Temporary workaround for the fact that the workspace is not yet implemented
    metadata.lesson.content = {
        guide: "Hello, World!",
        workspace: {
            "index.js": "function sum(a, b) {\n  return a + b\n}\n\nconsole.log(sum(1, 2))",
            "index.html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Document</title>\n</head>\n<body>\n<h1>Hello, World!</h1>\n<p>Welcome to my website!</p>\n</body>\n</html>",
            "src/b.txt": "lol\n"
        }
    }

    // Return the metadata
    return json(metadata)
}

export default function Editor() {
    // Lets load in the course metadata. If there is an error returned, our children must be
    // resilient against a lack of properly formatted metadata
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
