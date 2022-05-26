import NavigationBar from "app/components/NavigationBar"
import HeroSection from "app/components/Hero"
import FeaturesSection from "app/components/Home/FeaturesSection"
import SolutionsCTA from "app/components/Home/SolutionsCTA"

export default function Index() {
    return (
        <>
            <NavigationBar />
            <HeroSection />
            <FeaturesSection />
            <SolutionsCTA />
        </>
    )
}
