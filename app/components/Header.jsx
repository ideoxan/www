import FadeInSection from "app/components/FadeInSection"

export default function Header({ title, subtitle }) {
    return (
        <FadeInSection>
            <div className="mt-14 flex max-w-3xl flex-col p-8 md:mx-auto lg:w-full lg:max-w-7xl">
                <h1 className="glow-text-white max-w-sm pb-2 font-sans text-3xl font-extrabold tracking-tight sm:mx-auto sm:max-w-md sm:text-center sm:text-4xl md:max-w-full md:text-5xl">
                    {title}
                </h1>
                <h2 className="mt-2 max-w-sm font-sans text-sm font-medium tracking-tight text-gray-50 opacity-80 sm:mx-auto sm:max-w-md sm:text-center sm:text-base md:max-w-lg">
                    {subtitle}
                </h2>
            </div>
        </FadeInSection>
    )
}
