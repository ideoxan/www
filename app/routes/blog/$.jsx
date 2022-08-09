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
                <div className="flex flex-col mt-14 md:mx-auto max-w-3xl lg:max-w-7xl lg:w-full p-8">
                    <h1 className="sm:mx-auto font-sans font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl max-w-sm sm:max-w-md md:max-w-full sm:text-center glow-text-white pb-2">
                        The Ideoxan Blog
                    </h1>
                    <h2 className="sm:mx-auto mt-2 font-sans font-medium tracking-tight text-sm sm:text-base max-w-sm sm:max-w-md md:max-w-lg sm:text-center text-gray-50 opacity-80">
                        The latest updates from the Ideoxan team
                    </h2>
                </div>
            </FadeInSection>
            <div className="section flex-col mx-auto">
                <div className="flex flex-row flex-wrap justify-center p-6 max-w-8xl mx-auto w-full place-content-center gap-y-6 gap-x-8">
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
