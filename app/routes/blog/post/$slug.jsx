import NavigationBar from "app/components/NavigationBar"
import Footer from "app/components/Footer"
import { json, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"
import posts from "app/components/Blog/posts.jsx"
import { Facebook, Linkedin, Twitter } from "@icons-pack/react-simple-icons"
import styles from "app/styles/prism-theme.css"
import formatDate from "app/utils/formatDate"

export const links = () => {
    return [{ rel: "stylesheet", href: styles }]
}

export const loader = async ({ params, request }) => {
    if (!params.slug)
        throw new Response("Not Found", {
            status: 404,
        })
    if (!posts[params.slug])
        throw new Response("Not Found", {
            status: 404,
        })
    if (!posts[params.slug].attributes.published)
        throw new Response("Not Found", {
            status: 404,
        })

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

        if (error) return json({ session: null, userData: null, error, params, url: request.url })

        if (userData) {
            return json({ session, userData: userData[0], params, url: request.url })
        }
    }

    return json({ session: null, userData: null, params, url: request.url })
}

export default function BlogPost() {
    let { session, userData, params, url } = useLoaderData()

    const post = posts[params.slug]
    let PostMDX = post.default
    let encodedURL = encodeURIComponent(url)
    let share = {
        fb: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            post.attributes.title + " on @ideoxan\n" + url
        )}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodeURIComponent(
            post.attributes.title
        )}&summary=&source=`,
    }

    let displayedArticleCount = 0

    return (
        <>
            <NavigationBar session={session} userData={userData} />
            <main className="flex flex-col w-full">
                <div className="flex flex-col lg:flex-row md:mt-8 mb-2 lg:mb-20 md:mx-auto h-full">
                    <article className="flex flex-col max-w-3xl w-full p-8">
                        <div className="flex flex-col md:flex-row">
                            <div className="flex flex-row">
                                <img
                                    src="/images/ix_logo_purple_1024_1024.png"
                                    alt={post.attributes.author + "'s Profile Picture"}
                                    className="w-8 h-8 my-auto rounded-full"
                                />
                                <div className="flex flex-col ml-4">
                                    <p className="font-sans font-medium text-left text-sm text-gray-50 opacity-80">
                                        Posted by{" "}
                                        <a
                                            href={post.attributes.author.replace("@", "/user/")}
                                            className="hover:underline"
                                        >
                                            {post.attributes.author}
                                        </a>
                                    </p>
                                    <p className="mt-0.5 font-sans font-bold text-left text-2xs text-gray-100 opacity-80">
                                        {formatDate(post.attributes.date)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row mt-6 md:ml-auto space-x-6 md:my-auto">
                                <button
                                    className="text-gray-50 opacity-50 hover:opacity-100 flex flex-row"
                                    onClick={() => {
                                        window.open(share.fb, "_blank")
                                    }}
                                >
                                    <Facebook width={16} />
                                </button>
                                <button
                                    className="text-gray-50 opacity-50 hover:opacity-100 flex flex-row"
                                    onClick={() => {
                                        window.open(share.twitter, "_blank")
                                    }}
                                >
                                    <Twitter width={16} />
                                </button>
                                <button
                                    className="text-gray-50 opacity-50 hover:opacity-100 flex flex-row"
                                    onClick={() => {
                                        window.open(share.linkedin, "_blank")
                                    }}
                                >
                                    <Linkedin width={16} />
                                </button>
                            </div>
                        </div>
                        <h1 className="mt-8 pb-2 font-sans font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl glow-text-white">
                            {post.attributes.title}
                        </h1>
                        <h2 className="italic mt-2 font-sans font-semibold tracking-tight text-sm sm:text-base text-gray-100">
                            {post.attributes.description}
                        </h2>
                        <img
                            src={post.attributes.thumbnail}
                            className="mt-6 md:mt-8 w-full h-auto object-cover rounded-md"
                            alt={post.attributes.title + "'s thumbnail"}
                        />
                        <div className="mt-6 md:mt-8 blog-content">
                            <PostMDX />
                        </div>
                    </article>
                    {/* <div className="flex flex-col max-w-sm w-full p-8">
                        <h3 className="font-sans font-bold text-lg md:text-xl text-gray-50 text-left tracking-tight mt-8 lg:mt-0 mb-2 text-transparent bg-gradient-white bg-clip-text">More posts</h3>
                        <div className="flex flex-row lg:flex-col w-full">
                            {Object.values(posts).map((post, i) => {
                                if (!post.attributes.published) return null
                                if (post.attributes.slug === params.slug) return null
                                if (displayedArticleCount >= 5) return null

                                displayedArticleCount++
                                return (
                                    <div key={i} className="group flex flex-col-reverse lg:flex-row w-full lg:mb-4 mr-4 lg:mr-0 cursor-pointer" onClick={() => window.location = "/blog/post/" + post.attributes.slug}>
                                        <p className="group-hover:underline font-sans font-semibold text-sm text-gray-50 text-left pr-4 w-full mt-2 lg:mt-0 mb-auto lg:mb-0">{post.attributes.title}</p>
                                        <img src={post.attributes.thumbnail} className="lg:w-28 object-cover rounded-md" alt={post.attributes.title + "'s thumbnail"} />
                                    </div>
                                )
                            })}
                        </div>
                    </div> */}
                </div>
            </main>
            <Footer />
        </>
    )
}
