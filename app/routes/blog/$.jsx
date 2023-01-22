import NavigationBar from "app/components/NavigationBar"
import Footer from "app/components/Footer"
import { json, redirect } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { getAuthData } from "app/utils/auth.server.js"
import posts from "app/components/Blog/posts.jsx"
import BlogCard from "app/components/Blog/BlogCard"
import FadeInSection from "app/components/FadeInSection"
import Header from "app/components/Header"
import prodBlockServer from "app/utils/prodBlock.server"

export const loader = async ({ request }) => {
    prodBlockServer()

    // Load the user data and session
    let { session, data: userData, error } = await getAuthData(request)
    // Redirect to login if invalid session
    if (error == "invalid_session") return redirect("/login", { headers: { "Set-Cookie": "" } })

    return json({ session, userData, error })
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
