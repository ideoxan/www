import FadeInSection from "app/components/FadeInSection"

export default function HeroSection() {
    return (
        <FadeInSection>
            <header id="hero" className="bg-center bg-contain bg-no-repeat overflow-y-visible flex flex-col w-full md:bg-img-hero">

                {/* Header and tagline */}
                <div className="flex flex-col mt-8 lg:mt-32 mb-0 md:mb-10 lg:mb-8 md:mx-auto max-w-3xl lg:max-w-7xl lg:w-full p-8">
                    <h1 className="sm:mx-auto font-sans font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl max-w-sm sm:max-w-md md:max-w-full sm:text-center text-gray-50 glow-text-white">Learn computer science for free.</h1>
                    <h2 className="sm:mx-auto mt-8 font-sans font-semibold tracking-tight text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md md:max-w-full sm:text-center text-gray-50 opacity-80">Ideoxan is empowering the next generation of programmers, makers, and inventors.</h2>
                    <a href="/signup" className="sm:mx-auto mt-12 bttn bttn-round bttn-normal bttn-gradient bttn-glow">Join the Waitlist --&gt;</a>
                </div>

                {/* Hero image */}
                <div className="hidden md:flex flex-col flex-shrink mt-2 mb-32 w-full mx-auto px-8">
                    <img src="/images/EditorConcept.jpg" className="mx-auto w-full lg:max-w-5xl h-auto rounded-lg ring-1 ring-gray-500 ring-opacity-50 shadow-2xl" alt="A screenshot of the Ideoxan Editor"></img>
                </div>
            </header>
        </FadeInSection>
    )
}
