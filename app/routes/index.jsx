import NavigationBar from "app/components/NavigationBar"
import HeroSection from "app/components/Hero"
import HomePageFeaturesSection from "app/components/HomePageFeaturesSection"
import HomePageSolutionsCTA from "app/components/HomePageSolutionsCTA"

export default function Index() {
    return (
        <>
            <NavigationBar />
            <HeroSection />
            <HomePageFeaturesSection />
            <HomePageSolutionsCTA />
        </>
    )
}
