import FeaturesItem from 'app/components/Home/FeaturesItem'
import FadeInSection from "app/components/FadeInSection"

export default function FreeForAllSection() {
    return (
        <FadeInSection>
            <section id="cost" className="section flex-col">

                {/* Features */}
                <div className="section-container flex-col md:flex-row space-x-6">

                    {/* Feature Listing Column */}
                    <div className="flex flex-col p-6 md:w-1/2 my-auto">

                        <h2 className="section-header">Free for everyone, forever</h2>
                        <ul className="flex flex-col mt-8 space-y-8">

                            {/* Feature 1 */}
                            <FeaturesItem
                                icon="DollarSign"
                                title="Zero Cost"
                                description="We have kept our promise of &quot;Free for everyone, forever.&quot; We will never charge individual accounts nor will content ever be paywalled"
                            />

                            {/* Feature 2 */}
                            <FeaturesItem
                                icon="BookOpen"
                                title="Open For All"
                                description="All courses are licensed under the Creative Commons Attribution ShareAlike 4.0 International (CC BY-SA 4.0) license. Courses can be viewed, modified, and re-distributed free of charge."
                            />

                        </ul>

                    </div>

                    {/* Image Column */}
                    <div className="hidden md:flex flex-shrink flex-grow-0 flex-col w-1/2 p-6">
                        <img src="/images/Cost1.png" className="flex-shrink w-auto mx-auto my-auto" alt="A child and her parents on a laptop" />
                    </div>

                </div>

            </section>
        </FadeInSection>
    )
}
