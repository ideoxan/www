import NavigationBar from "app/components/NavigationBar"
import Footer from "app/components/Footer"
import { json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"
import posts from "app/components/Blog/posts.jsx"
import BlogCard from "app/components/Blog/BlogCard"

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
            <div className="flex flex-col mt-8 mb-2 lg:mt-32 lg:mb-20 md:mx-auto max-w-3xl lg:max-w-7xl lg:w-full p-8">
                <h1 className="pb-2 sm:mx-auto font-sans font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl max-w-sm sm:max-w-md md:max-w-full sm:text-center glow-text-white">
                    Latest Updates
                </h1>
            </div>
            <div className="section flex-col md:flex-row space-x-6 max-w-7xl w-full mx-auto">
                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 p-6 max-w-8xl mx-auto w-full place-content-center">
                    {Object.values(posts).map((post, i) => {
                        if (!post.attributes.published) return null
                        return <BlogCard key={i} post={post} />
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}
