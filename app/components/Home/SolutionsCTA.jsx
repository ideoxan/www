import FadeInSection from "app/components/FadeInSection"

export default function SolutionsCTA() {
    return (
        <FadeInSection>
            <section id="solutions" className="section flex-col px-8">
                {/* IX Solutions Section */}
                <div className="section-container bg-gray-700 flex-col rounded-2xl ring-1 ring-gray-500 ring-opacity-50 shadow-2xl overflow-clip">
                    {/* Image */}
                    <img
                        src="/images/ix_edu_cta.png"
                        alt="Group of students sitting on laptops programming."
                    ></img>

                    {/* Text */}
                    <div className="flex flex-col p-6">
                        <h2 className="mx-auto section-header text-center">
                            Introducing Ideoxan Solutions
                        </h2>
                        <p className="mx-auto mt-4 paragraph text-center">
                            Need to supercharge learning in your classroom? Find a new way to
                            educate with <b>IX/EDU</b>
                        </p>
                        <button className="mx-auto mt-6 mb-2 bttn bttn-round bttn-normal bttn-white bttn-disabled">
                            Coming Soon
                        </button>
                    </div>
                </div>
            </section>
        </FadeInSection>
    )
}
