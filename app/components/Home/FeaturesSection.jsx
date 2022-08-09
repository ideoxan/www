import FeaturesItem from "app/components/Home/FeaturesItem"
import FadeInSection from "app/components/FadeInSection"

export default function FeaturesSection() {
    return (
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
    )
}
