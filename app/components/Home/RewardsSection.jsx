import FeaturesItem from "app/components/Home/FeaturesItem"
import FadeInSection from "app/components/FadeInSection"

export default function RewardsSection() {
    return (
        <FadeInSection>
            <section id="rewards" className="section flex-col">
                {/* Features */}
                <div className="section-container flex-col space-x-6 md:flex-row">
                    {/* Feature Listing Column */}
                    <div className="my-auto flex flex-col p-6 md:w-1/2">
                        <FadeInSection direction="right">
                            <h2 className="section-header">Level up your coding skills</h2>
                            <div className="mt-4 w-max rounded-full bg-tertiary bg-opacity-25 px-2 py-1 font-sans text-xs font-bold uppercase text-tertiary">
                                Coming Soon
                            </div>
                            <ul className="mt-6 flex flex-col space-y-8">
                                {/* Feature 1 */}
                                <FeaturesItem
                                    icon="Award"
                                    title="Learn More, Earn More"
                                    description="Completing a lesson rewards you with Ideoxan Bits, a virtual token system. Depending on the difficulty of a course, more Bits may be rewarded."
                                />

                                {/* Feature 2 */}
                                <FeaturesItem
                                    icon="TrendingUp"
                                    title="Compete Against Others"
                                    description="Climb the leaderboards in a friendly community competition. Earn the most points and you might find your place on the leaderboard!"
                                />

                                {/* Feature 3 */}
                                <FeaturesItem
                                    icon="Gift"
                                    title="Earn Prizes"
                                    description="In the Ideoxan Marketplace, you can exchange Bits for various prizes. Not only can you earn some cool Ideoxan merch, but you can also take part in limited time offers through our industry partners."
                                />
                            </ul>
                        </FadeInSection>
                    </div>

                    {/* Image Column */}
                    <div className="hidden w-1/2 flex-shrink flex-grow-0 flex-col p-6 md:flex">
                        <img
                            src="/images/rewards_sample.png"
                            className="mx-auto my-auto w-auto flex-shrink"
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </FadeInSection>
    )
}
