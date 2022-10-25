import NavigationBar from "app/components/NavigationBar"
import FeaturesSection from "app/components/Home/FeaturesSection"
import SolutionsCTA from "app/components/Home/SolutionsCTA"
import FreeForAllSection from "app/components/Home/FreeForAllSection"
import CoursesSection from "app/components/Home/CoursesSection"
import OpenSourceSection from "app/components/Home/OpenSourceSection"
import RewardsSection from "app/components/Home/RewardsSection"
import SignupCTA from "app/components/Home/SignupCTA"
import Footer from "app/components/Footer"
import { json, redirect } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import FadeInSection from "app/components/FadeInSection"

export const loader = async ({ request }) => {
    // Check user auth
    let session = await supabaseLocalStrategy().checkSession(request)

    // If the user session is bad, redirect to the login page
    if (session) {
        let { user } = session
        if (!user || !user.id) throw redirect("/login")

        // If the user is authenticated, redirect to the dashboard
        throw redirect("/dashboard")
    }

    return json({ session: null, userData: null })
}

export default function Index() {
    let { session, userData } = useLoaderData()

    return (
        <main>
            <NavigationBar session={session} userData={userData} />
            <FadeInSection>
                <header
                    id="hero"
                    className="flex w-full flex-col overflow-y-visible bg-contain bg-center bg-no-repeat md:bg-img-hero">
                    {/* Header and tagline */}
                    <div className="mt-24 mb-0 flex max-w-3xl flex-col p-8 md:mx-auto md:mt-32 md:mb-10 lg:mt-48 lg:mb-8 lg:w-full lg:max-w-7xl">
                        <h1 className="glow-text-white max-w-sm font-sans text-3xl font-extrabold tracking-tight sm:mx-auto sm:max-w-md sm:text-center sm:text-4xl md:max-w-full md:text-5xl">
                            Learn computer science for free.
                        </h1>
                        <h2 className="mt-6 max-w-sm font-sans text-sm font-semibold tracking-tight text-gray-50 opacity-80 sm:mx-auto sm:max-w-md sm:text-center sm:text-base md:max-w-full md:text-lg">
                            Ideoxan is empowering the next generation of programmers, makers, and
                            inventors.
                        </h2>
                        {(global || window)?.env?.WORKER_ENV === "production" ? (
                            <a
                                href="/waitlist"
                                className="bttn bttn-round bttn-normal bttn-gradient box-glow-hover bttn-gradient-arrow mt-8 sm:mx-auto">
                                Join the Waitlist
                            </a>
                        ) : (
                            <a
                                href="/signup"
                                className="bttn bttn-round bttn-normal bttn-gradient box-glow-hover bttn-gradient-arrow mt-8 sm:mx-auto">
                                Get Started
                            </a>
                        )}
                    </div>

                    {/* Hero image */}
                    <div className="mx-auto mt-2 mb-32 hidden w-full flex-shrink flex-col px-8 md:flex">
                        <img
                            src="/images/editor_20220801.png"
                            className="mx-auto h-auto w-full rounded-lg shadow-2xl ring-1 ring-gray-500 ring-opacity-50 lg:max-w-5xl"
                            alt="A screenshot of the Ideoxan Editor"></img>
                    </div>
                </header>
            </FadeInSection>
            <FeaturesSection />
            <SolutionsCTA />
            <FreeForAllSection />
            <CoursesSection />
            <OpenSourceSection />
            <RewardsSection />
            {!session?.user && <SignupCTA />}
            <Footer />
        </main>
    )
}
