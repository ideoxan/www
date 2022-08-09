import FeaturesItem from "app/components/Home/FeaturesItem"
import FadeInSection from "app/components/FadeInSection"

export default function FreeForAllSection() {
    return (
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
    )
}
