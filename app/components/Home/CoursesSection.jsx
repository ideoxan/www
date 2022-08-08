import CourseCard from "app/components/Home/CourseCard"
import FadeInSection from "app/components/FadeInSection"

export default function CoursesSection() {
    let sampleCourseData = [
        {
            title: "Intro to HTML",
            description:
                "Learn the basics of what makes up the world wide web in this introductory course.",
            infoURL: "/courses/#abc123-xyz456-7890",
            startURL: "/learn/abc123-xyz456-7890/1/1",
        },
        {
            title: "Intro to CSS",
            description:
                "CSS allows for any HTML document to be stylized and formatted. In this course you will learn the basics of CSS and be able to apply styles to HTML documents.",
            infoURL: "/courses/#abc123-xyz456-7890",
            startURL: "/learn/abc123-xyz456-7890/1/1",
        },
        {
            className: "hidden sm:flex md:hidden lg:flex",
            title: "Intro to NodeJS",
            description:
                "NodeJS is the runtime built on top of the v8 engine that allows for JavaScript to be run in desktop and server environments.",
            infoURL: "/courses/#abc123-xyz456-7890",
            startURL: "/learn/abc123-xyz456-7890/1/1",
            comingSoon: true,
        },
        {
            className: "hidden sm:flex md:hidden lg:flex",
            title: "Intro to C",
            description:
                "C is a general purpose programming language invented in 1970 by Dennis Ritchie. Despite its age, today C is still just as powerful as it is popular.",
            infoURL: "/courses/#abc123-xyz456-7890",
            startURL: "/learn/abc123-xyz456-7890/1/1",
            comingSoon: true,
        },
    ]
    return (
        <FadeInSection>
            <section id="features" className="section flex-col">
                {/* Features */}
                <div className="section-container flex-col md:flex-row md:space-x-6">
                    {/* Feature Listing Column */}
                    <div className="flex flex-col p-6 md:w-1/2 my-auto">
                        <FadeInSection direction="right">
                            <h2 className="section-header">Learn the next great thing</h2>
                            <p className="paragraph mt-8">
                                With so many courses to choose from, you can find your new favorite
                                programming language. Drop into a ready developer environment within
                                seconds and start coding in any browser.
                            </p>
                            <img
                                src="/images/tesseract_50.png"
                                className="mt-8 h-auto w-48"
                                aria-hidden="true"
                                alt=""
                            />
                        </FadeInSection>
                    </div>

                    {/* Image Column */}
                    <div className="my-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 grid-flow-row md:w-1/2 p-6 gap-x-6 gap-y-4 w-full">
                        {sampleCourseData.map((course, index) => (
                            <CourseCard
                                key={index}
                                title={course.title}
                                description={course.description}
                                infoURL={course.infoURL}
                                startURL={course.startURL}
                                comingSoon={course.comingSoon}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </FadeInSection>
    )
}
