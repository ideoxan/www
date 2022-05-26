import NavigationBar from "app/components/NavigationBar"
import HeroSection from "app/components/Hero"
import FeaturesSection from "app/components/Home/FeaturesSection"
import SolutionsCTA from "app/components/Home/SolutionsCTA"
import FreeForAllSection from "app/components/Home/FreeForAllSection"

export default function Index() {
    return (
        <>
            <NavigationBar />
            <HeroSection />
            <FeaturesSection />
            <SolutionsCTA />
            <FreeForAllSection />
        </>
    )
}
