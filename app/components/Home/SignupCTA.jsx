import FadeInSection from "app/components/FadeInSection"

export default function SignupCTA() {
    return (
        <FadeInSection>
            <section id="solutions" className="section flex-col px-8">
                {/* IX Solutions Section */}
                <div className="section-container bg-gray-700 flex-col md:flex-row rounded-2xl ring-1 ring-gray-500 ring-opacity-50 shadow-2xl overflow-clip">
                    {/* Image */}
                    <img
                        src="/images/cta_signup.png"
                        className="flex-shrink-0 w-0 lg:w-1/4 h-auto"
                        aria-hidden="true"
                        alt=""
                    />

                    {/* Text */}
                    <div className="flex flex-col p-6 my-auto w-full md:w-max lg:w-1/2">
                        <h2 className="mx-auto md:mx-0 lg:mx-auto section-header text-center md:text-left lg:text-center">
                            Start your programming journey.
                        </h2>
                        <p className="mx-auto md:mx-0 lg:mx-auto mt-4 paragraph text-center md:text-left lg:text-center">
                            It takes less than 5 minutes to get started for no cost!
                        </p>
                    </div>

                    {/* Signup Button */}
                    <div className="lg:w-1/4 flex md:my-auto mx-auto px-6 pb-6 md:py-6">
                        <a
                            href="/signup"
                            className="mx-auto my-auto bttn bttn-round bttn-normal bttn-gradient"
                        >
                            Join the Waitlist
                        </a>
                    </div>
                </div>
            </section>
        </FadeInSection>
    )
}
