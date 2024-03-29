import FadeInSection from "app/components/FadeInSection"

export default function SignupCTA() {
    return (
        <FadeInSection>
            <section id="solutions" className="section flex-col px-8">
                {/* IX Solutions Section */}
                <div className="section-container flex-col overflow-clip rounded-2xl bg-gray-700 bg-left bg-no-repeat shadow-2xl ring-1 ring-gray-500 ring-opacity-50 md:flex-row xl:bg-[url('/images/cta_signup.png')] xl:py-8">
                    {/* Image */}
                    <div className="h-auto w-0 flex-shrink-0 lg:w-1/4"></div>
                    {/* <img
                        src="/images/cta_signup.png"
                        className="h-auto w-0 flex-shrink-0 lg:w-1/4"
                        aria-hidden="true"
                        alt=""
                    /> */}

                    {/* Text */}
                    <div className="my-auto flex w-full flex-col p-6 md:w-max lg:w-1/2">
                        <h2 className="section-header mx-auto text-center md:mx-0 md:text-left lg:mx-auto lg:text-center">
                            Start your programming journey.
                        </h2>
                        <p className="font-style-paragraph mx-auto mt-4 text-center md:mx-0 md:text-left lg:mx-auto lg:text-center">
                            It takes less than 5 minutes to get started for no cost!
                        </p>
                    </div>

                    {/* Signup Button */}
                    <div className="mx-auto flex px-6 pb-6 md:my-auto md:py-6 lg:w-1/4">
                        {(global || window)?.env?.WORKER_ENV === "production" ? (
                            <a
                                href="/waitlist"
                                className="bttn bttn-round bttn-normal bttn-gradient box-glow-hover bttn-gradient-arrow mx-auto my-auto">
                                Join the Waitlist
                            </a>
                        ) : (
                            <a
                                href="/signup"
                                className="bttn bttn-round bttn-normal bttn-gradient box-glow-hover bttn-gradient-arrow mx-auto my-auto">
                                Get Started
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </FadeInSection>
    )
}
