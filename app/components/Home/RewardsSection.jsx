import FeaturesItem from "app/components/Home/FeaturesItem"
import FadeInSection from "app/components/FadeInSection"

export default function RewardsSection() {
    return (
        <FadeInSection>
        <section id="rewards" className="section flex-col">

            {/* Features */}
            <div className="section-container flex-col md:flex-row space-x-6">

                {/* Feature Listing Column */}
                <div className="flex flex-col p-6 md:w-1/2 my-auto">

                    <h2 className="section-header">Level up your coding skills</h2>
                    <ul className="flex flex-col mt-8 space-y-8">

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

                </div>

                {/* Image Column */}
                <div className="hidden md:flex flex-shrink flex-grow-0 flex-col w-1/2 p-6">

                    <img src="/images/rewards_sample.png" className="flex-shrink w-auto mx-auto my-auto" />

                </div>

            </div>

            </section>
        </FadeInSection>
    )
}
