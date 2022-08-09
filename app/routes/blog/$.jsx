import NavigationBar from "app/components/NavigationBar"
import Footer from "app/components/Footer"
import { json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"
import posts from "app/components/Blog/posts.jsx"
import BlogCard from "app/components/Blog/BlogCard"
import FadeInSection from "app/components/FadeInSection"

export const loader = async ({ request }) => {
    // Check user auth
    let session = await supabaseLocalStrategy.checkSession(request)

    // If the user session is bad, redirect to the login page
    if (session) {
        let { user } = session
        if (!user || !user.id) throw redirect("/login")

        // If the user is authenticated, get the user's data from the database
        let { data: userData, error } = await supabaseAdmin
            .from("user_data")
            .select()
            .eq("id", user.id)

        if (error) return json({ session: null, userData: null, error })

        if (userData) {
            return json({ session, userData: userData[0] })
        }
    }

    return json({ session: null, userData: null })
}

export default function BlogIndex() {
    let { session, userData } = useLoaderData()

    return (
        <>
            <NavigationBar session={session} userData={userData} />
            <FadeInSection>
                <div className="mt-14 flex max-w-3xl flex-col p-8 md:mx-auto lg:w-full lg:max-w-7xl">
                    <h1 className="glow-text-white max-w-sm pb-2 font-sans text-3xl font-extrabold tracking-tight sm:mx-auto sm:max-w-md sm:text-center sm:text-4xl md:max-w-full md:text-5xl">
                        The Ideoxan Blog
                    </h1>
                    <h2 className="mt-2 max-w-sm font-sans text-sm font-medium tracking-tight text-gray-50 opacity-80 sm:mx-auto sm:max-w-md sm:text-center sm:text-base md:max-w-lg">
                        The latest updates from the Ideoxan team
                    </h2>
                </div>
            </FadeInSection>
            <div className="section mx-auto flex-col">
                <div className="max-w-8xl mx-auto flex w-full flex-row flex-wrap place-content-center justify-center gap-y-6 gap-x-8 p-6">
                    {Object.values(posts).map((post, i) => {
                        if (!post.attributes.published) return null
                        return (
                            <FadeInSection key={i}>
                                <BlogCard key={i} post={post} />
                            </FadeInSection>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}
