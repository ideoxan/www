import FadeInSection from "app/components/FadeInSection"

export default function HeroSection() {
    return (
        <FadeInSection>
            <header id="hero" className="bg-center bg-contain bg-no-repeat overflow-y-visible flex flex-col w-full md:bg-img-hero">

                {/* Header and tagline */}
                <div className="flex flex-col mt-20 lg:mt-40 mb-4 md:mb-10 lg:mb-16 mx-auto max-w-3xl lg:max-w-7xl lg:w-full p-8">
                    <h1 className="mx-auto font-sans font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl text-center text-gray-50">Learn computer science for free.</h1>
                    <h2 className="mx-auto mt-6 font-sans font-medium tracking-tight text-sm sm:text-base md:text-lg text-center text-gray-50 opacity-80"> Ideoxan is empowering the next generation of programmers, makers, and inventors.</h2>
                    <a href="/signup" className="mx-auto mt-12 bttn bttn-outline bttn-normal bttn-outline-white">Join the Waitlist --&gt;</a>
                </div>

                {/* Hero image */}
                <div className="hidden md:flex flex-col flex-shrink mt-4 mb-32 w-full mx-auto px-8">
                    <img src="/images/EditorConcept.jpg" className="mx-auto w-full lg:max-w-6xl h-auto rounded-lg ring-1 ring-gray-500 ring-opacity-50 shadow-2xl" alt="A screenshot of the Ideoxan Editor"></img>
                </div>
            </header>
        </FadeInSection>
    )
}
