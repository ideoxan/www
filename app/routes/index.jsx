import NavigationBar from "app/components/NavigationBar"
import HeroSection from "app/components/Hero"
import FeaturesSection from "app/components/Home/FeaturesSection"
import SolutionsCTA from "app/components/Home/SolutionsCTA"
import FreeForAllSection from "app/components/Home/FreeForAllSection"
import CoursesSection from "app/components/Home/CoursesSection"
import OpenSourceSection from "app/components/Home/OpenSourceSection"
import RewardsSection from "app/components/Home/RewardsSection"

export default function Index() {
    return (
        <>
            <NavigationBar />
            <HeroSection />
            <FeaturesSection />
            <SolutionsCTA />
            <FreeForAllSection />
            <CoursesSection />
            <OpenSourceSection />
            <RewardsSection />
        </>
    )
}
