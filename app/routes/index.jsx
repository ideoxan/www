import NavigationBar from "app/components/NavigationBar"
import FeaturesItem from "app/components/Home/FeaturesItem"
import SolutionsCTA from "app/components/Home/SolutionsCTA"
import CoursesSection from "app/components/Home/CoursesSection"
import OpenSourceSection from "app/components/Home/OpenSourceSection"
import RewardsSection from "app/components/Home/RewardsSection"
import SignupCTA from "app/components/Shared/SignupCTA"
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
            <FadeInSection>
                <section id="features" className="section flex-col">
                    {/* Features */}
                    <div className="section-container flex-col space-x-6 md:flex-row">
                        {/* Feature Listing Column */}
                        <div className="my-auto flex flex-col p-6 md:w-1/2">
                            <FadeInSection direction="right">
                                <h2 className="section-header">Empower your future</h2>
                                <ul className="mt-8 flex flex-col space-y-8">
                                    {/* Feature 1 */}
                                    <FeaturesItem
                                        icon="Box"
                                        title="Interactive Content"
                                        description="All courses include interactive quizzes, lessons, and exercises. Each exercise has a certain objective that needs to be completed through the online code editor."
                                    />

                                    {/* Feature 2 */}
                                    <FeaturesItem
                                        icon="GraduationCap"
                                        title="Professional Grade Courses"
                                        description="Courses are written by developers with years of programming and computer science experience. Gain technical know-how and job relevant knowledge with ease."
                                    />

                                    {/* Feature 3 */}
                                    <FeaturesItem
                                        icon="Zap"
                                        title="Take Control"
                                        description="Learn at your own pace without the pressure from an online instructor. You get to decide your future in CS with the tools of tomorrow."
                                    />
                                </ul>
                            </FadeInSection>
                        </div>
                        {/* Image Column */}
                        <div className="hidden w-1/2 flex-shrink flex-grow-0 flex-col p-6 md:flex">
                            <img
                                src="/images/Feat1.png"
                                className="mx-auto my-auto w-auto flex-shrink"
                                alt="Two people programming"
                            />
                        </div>
                    </div>
                </section>
            </FadeInSection>
            <SolutionsCTA />
            <FadeInSection>
                <section id="cost" className="section flex-col">
                    {/* Features */}
                    <div className="section-container flex-col space-x-6 md:flex-row">
                        {/* Feature Listing Column */}
                        <div className="my-auto flex flex-col p-6 md:w-1/2">
                            <FadeInSection direction="right">
                                <h2 className="section-header">Free for everyone, forever</h2>
                                <ul className="mt-8 flex flex-col space-y-8">
                                    {/* Feature 1 */}
                                    <FeaturesItem
                                        icon="DollarSign"
                                        title="Zero Cost"
                                        description='We have kept our promise of "Free for everyone, forever." We will never charge individual accounts nor will content ever be paywalled'
                                    />

                                    {/* Feature 2 */}
                                    <FeaturesItem
                                        icon="BookOpen"
                                        title="Open For All"
                                        description="All courses are licensed under the Creative Commons Attribution ShareAlike 4.0 International (CC BY-SA 4.0) license. Courses can be viewed, modified, and re-distributed free of charge."
                                    />
                                </ul>
                            </FadeInSection>
                        </div>

                        {/* Image Column */}
                        <div className="hidden w-1/2 flex-shrink flex-grow-0 flex-col p-6 md:flex">
                            <img
                                src="/images/Cost1.png"
                                className="mx-auto my-auto w-auto flex-shrink"
                                alt="A child and her parents on a laptop"
                            />
                        </div>
                    </div>
                </section>
            </FadeInSection>
            <CoursesSection />
            <OpenSourceSection />
            <RewardsSection />
            {!session?.user && <SignupCTA />}
            <Footer />
        </main>
    )
}
