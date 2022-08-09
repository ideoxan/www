import FadeInSection from "app/components/FadeInSection"

export default function HeroSection({ session }) {
    return (
        <FadeInSection>
            <header
                id="hero"
                className="flex w-full flex-col overflow-y-visible bg-contain bg-center bg-no-repeat md:bg-img-hero"
            >
                {/* Header and tagline */}
                <div className="mt-8 mb-0 flex max-w-3xl flex-col p-8 md:mx-auto md:mb-10 lg:mt-32 lg:mb-8 lg:w-full lg:max-w-7xl">
                    <h1 className="glow-text-white max-w-sm font-sans text-3xl font-extrabold tracking-tight sm:mx-auto sm:max-w-md sm:text-center sm:text-4xl md:max-w-full md:text-5xl">
                        Learn computer science for free.
                    </h1>
                    <h2 className="mt-8 max-w-sm font-sans text-sm font-semibold tracking-tight text-gray-50 opacity-80 sm:mx-auto sm:max-w-md sm:text-center sm:text-base md:max-w-full md:text-lg">
                        Ideoxan is empowering the next generation of programmers, makers, and
                        inventors.
                    </h2>
                    {session?.user ? (
                        <button
                            disabled={true}
                            className="bttn bttn-round bttn-normal bttn-gradient bttn-disabled mt-12 sm:mx-auto"
                        >
                            You are already on the Waitlist
                        </button>
                    ) : (
                        <a
                            href="/signup"
                            className="bttn bttn-round bttn-normal bttn-gradient box-glow-hover bttn-gradient-arrow mt-12 sm:mx-auto"
                        >
                            Join the Waitlist
                        </a>
                    )}
                </div>

                {/* Hero image */}
                <div className="mx-auto mt-2 mb-32 hidden w-full flex-shrink flex-col px-8 md:flex">
                    <img
                        src="/images/editor_20220801.png"
                        className="mx-auto h-auto w-full rounded-lg shadow-2xl ring-1 ring-gray-500 ring-opacity-50 lg:max-w-5xl"
                        alt="A screenshot of the Ideoxan Editor"
                    ></img>
                </div>
            </header>
        </FadeInSection>
    )
}
