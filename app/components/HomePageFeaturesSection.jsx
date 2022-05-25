import HomePageFeaturesItem from "app/components/HomePageFeaturesItem"

export default function HomePageFeaturesSection() {
    return (
        <section id="features" class="section flex-col">

            {/* Features */}
            <div class="section-container flex-col md:flex-row space-x-6">

                {/* Feature Listing Column */}
                <div class="flex flex-col p-6 md:w-1/2 my-auto">
                    <h2 class="section-header">Empower your future</h2>
                    <ul class="flex flex-col mt-8 space-y-8">

                        {/* Feature 1 */}
                        <HomePageFeaturesItem
                            icon="box"
                            title="Interactive Content"
                            description="All courses include interactive quizzes, lessons, and exercises. Each exercise has a certain objective that needs to be completed through the online code editor."
                        />

                        {/* Feature 2 */}
                        <HomePageFeaturesItem
                            icon="award"
                            title="Professional Grade Courses"
                            description="Courses are written by developers with years of programming and computer science experience. Gain technical know-how and job relevant knowledge with ease."
                        />

                        {/* Feature 3 */}
                        <HomePageFeaturesItem
                            icon="zap"
                            title="Take Control"
                            description="Learn at your own pace without the pressure from an online instructor. You get to decide your future in CS with the tools of tomorrow."
                        />
                    </ul>
                </div>
                {/* Image Column */}
                <div class="hidden md:flex flex-shrink flex-grow-0 flex-col w-1/2 p-6">
                    <img src="/images/Feat1.png" class="flex-shrink w-auto mx-auto my-auto" alt="Two people programming"></img>
                </div>
            </div>
        </section>
    )
}
