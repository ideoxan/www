import NavigationBar from "app/components/NavigationBar"
import HeroSection from "app/components/Hero"
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

export const loader = async ({ request, context }) => {
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
            <HeroSection session={session} />
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
