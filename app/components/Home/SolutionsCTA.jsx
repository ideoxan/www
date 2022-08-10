import FadeInSection from "app/components/FadeInSection"

export default function SolutionsCTA() {
    return (
        <FadeInSection>
            <section id="solutions" className="section flex-col px-8">
                {/* IX Solutions Section */}
                <div className="section-container flex-col overflow-clip rounded-2xl bg-gray-700 shadow-2xl ring-1 ring-gray-500 ring-opacity-50">
                    {/* Image */}
                    <img
                        src="/images/ix_edu_cta.png"
                        alt="Group of students sitting on laptops programming."></img>

                    {/* Text */}
                    <div className="flex flex-col p-6">
                        <h2 className="section-header mx-auto text-center">
                            Introducing Ideoxan Solutions
                        </h2>
                        <p className="paragraph mx-auto mt-4 text-center">
                            Need to supercharge learning in your classroom? Find a new way to
                            educate with <b>IX/EDU</b>
                        </p>
                        <button
                            disabled={true}
                            className="bttn bttn-round bttn-normal bttn-gradient bttn-disabled mx-auto mt-6">
                            Coming Soon
                        </button>
                    </div>
                </div>
            </section>
        </FadeInSection>
    )
}
