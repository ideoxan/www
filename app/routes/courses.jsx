import NavigationBar from "app/components/NavigationBar"
import Footer from "app/components/Footer"
import { json, redirect } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"
import Header from "app/components/Header"
import FadeInSection from "app/components/FadeInSection"
import SignupCTA from "app/components/Home/SignupCTA"

export const loader = async ({ request, context }) => {
    // Get list of courses
    const { data: folders, error: lsError } = await supabaseAdmin()
        .storage.from("course-content")
        .list("", {
            limit: 100,
            offset: 0,
        })

    if (lsError || !folders) {
        throw new Error("Could not load courses")
    }

    const storageURL = `${context.SUPABASE_URL}/storage/v1/object/public/course-content`

    const courses = []

    for (const folder of folders) {
        try {
            // Append the course metadata to the metadata object
            let data = await fetch(`${storageURL}/${folder.name}/course.json`)
            if (!data.ok) throw new Error(JSON.stringify(await data.json()))
            courses.push(await data.json())
        } catch (error) {
            if (context.WORKER_ENV !== "production") console.log(error)
        }
    }

    // Check user auth
    let session = await supabaseLocalStrategy().checkSession(request)

    // If the user session is bad, redirect to the login page
    if (session) {
        let { user } = session
        if (!user || !user.id) throw redirect("/login")

        // If the user is authenticated, get the user's data from the database
        let { data: userData, error } = await supabaseAdmin()
            .from("user_data")
            .select()
            .eq("id", user.id)

        if (error) return json({ session: null, userData: null, error, courses })

        if (userData) {
            return json({ session, userData: userData[0], courses })
        }
    }

    return json({ session: null, userData: null, courses })
}

export default function Index() {
    let { session, userData, courses } = useLoaderData()

    return (
        <main>
            <NavigationBar session={session} userData={userData} />

            {/* Header */}
            <Header
                title={"Available Courses"}
                subtitle={
                    "With a wide variety to choose from, you can find your new favorite programming language!"
                }
            />

            {/* Mission */}
            <FadeInSection>
                <section className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col space-x-6 md:flex-row"></div>
                </section>
            </FadeInSection>
            <FadeInSection>
                <div className="section mx-auto flex-col">
                    <div className="max-w-8xl mx-auto flex w-full flex-row flex-wrap place-content-center justify-center gap-y-6 gap-x-8 p-6">
                        {/* courses.map((course, i) => {
                            return (
                                <div
                                    key={i}
                                    className="group flex h-full w-96 flex-col rounded-lg bg-gray-700 px-4 py-3 ring-0 ring-gray-500 ring-opacity-50 hover:translate-y-px hover:scale-105 ">
                                    <h3 className="bg-gradient-white bg-clip-text text-left font-sans text-xl font-bold tracking-tight text-transparent">
                                        {course.name}
                                    </h3>
                                    <p className="font-style-paragraph my-2 h-full text-left text-sm text-gray-50">
                                        {course.description}
                                    </p>
                                    <div className="mt-auto flex w-full flex-row">
                                        <a
                                            href={"infoURL"}
                                            className="inline-block text-sm font-medium tracking-tight text-gray-50 opacity-50 hover:opacity-100">
                                            Learn More
                                        </a>
                                        <a
                                            href={"/learn/" + course.uuid}
                                            className="ml-auto inline-block text-sm font-extrabold tracking-tight text-secondary opacity-100 hover:opacity-80">
                                            Start --&gt;
                                        </a>
                                    </div>
                                </div>
                            )
                        }) */}
                    </div>
                </div>
            </FadeInSection>
            {!session?.user && <SignupCTA />}
            <Footer />
        </main>
    )
}
