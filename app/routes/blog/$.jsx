import NavigationBar from "app/components/NavigationBar"
import Footer from "app/components/Footer"
import { json, redirect } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"
import posts from "app/components/Blog/posts.jsx"
import BlogCard from "app/components/Blog/BlogCard"
import FadeInSection from "app/components/FadeInSection"
import Header from "app/components/Header"

export const loader = async ({ request, context }) => {
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
            <Header
                title={"The Ideoxan Blog"}
                subtitle={"The latest updates from the Ideoxan team"}
            />
            <div className="section mx-auto flex-col">
                <div className="mx-auto flex w-full max-w-4xl flex-row flex-wrap place-content-center justify-center gap-y-6 gap-x-8 p-6">
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
