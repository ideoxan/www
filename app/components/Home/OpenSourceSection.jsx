import FadeInSection from "app/components/FadeInSection"

export default function OpenSourceSection() {
    return (
        <FadeInSection>
            <section id="oss" className="section flex-col">

                {/* Features */}
                <div className="section-container flex-col md:flex-row space-x-6">

                    {/* Feature Listing Column */}
                    <div className="flex flex-col p-6 md:w-1/2 my-auto">
                        <FadeInSection direction="right">
                            <h2 className="section-header">We &lt;3 open source</h2>
                            <p className="paragraph mt-8">All courses curated by Ideoxan are licensed under the Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0). Courses can be viewed, modified, and re-distributed free of charge. The website, server, and editor are open source as well. All of our content is available on GitHub.</p>
                            <p className="paragraph mt-8">Ideoxan is community driven. Due to the open source model, new courses can be easily added to the catalogue. Ideoxan is backed by over a dozen contributors in the open source community. Courses are created by the community, for the community. </p>
                        </FadeInSection>
                    </div>

                    {/* Image Column */}
                    <div className="hidden md:flex flex-shrink flex-grow-0 flex-col w-1/2 p-6">

                        <img src="/images/oss2.png" className="flex-shrink w-auto mx-auto my-auto ring-1 ring-gray-500 ring-opacity-50 shadow-2xl rounded-lg" alt="Screenshot of Ideoxan's GitHub organization page." />

                    </div>

                </div>

            </section>
        </FadeInSection>
    )
}
