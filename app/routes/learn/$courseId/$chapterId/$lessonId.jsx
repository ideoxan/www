import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import EditorNavigationBar from "app/components/Editor/EditorNavigationBar"
import EditorActivitiesBar from "app/components/Editor/EditorActivitiesBar"
import EditorStatusBar from "app/components/Editor/EditorStatusBar"

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

    return (
        <div className="flex flex-col max-h-screen h-screen min-h-screen">
            <EditorNavigationBar
                courseUUID={metadata.course.uuid}
                lessonIndex={metadata.lesson.index}
                lessonName={metadata.lesson.name}
                chapterIndex={metadata.chapter.index}
                courseName={metadata.course.name}
                navigationNext={metadata.lesson.navigation.next}
                navigationPrevious={metadata.lesson.navigation.previous}
            />
            <main className="flex flex-row flex-grow w-full">
                <EditorActivitiesBar />
            </main>
            <EditorStatusBar />
        </div>
    )
}
