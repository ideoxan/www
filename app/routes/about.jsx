import NavigationBar from "app/components/NavigationBar"
import Footer from "app/components/Footer"
import { json, redirect } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"
import FadeInSection from "app/components/FadeInSection"
import { Discord, Github, Twitter } from "@icons-pack/react-simple-icons"
import OpenSourceSection from "app/components/Home/OpenSourceSection"
import Icon from "app/components/Icon"
import Header from "app/components/Header"

const teamData = [
    {
        name: "Skyclo",
        position: "Project Director",
        image: "https://avatars.githubusercontent.com/u/39171349",
        socials: {
            github: "https://github.com/skyclo",
            twitter: "https://twitter.com/skyclo_",
        },
    },
    {
        name: "Available",
        position: "Junior Full Stack Engineer",
        image: "https://plchldr.co/i/125x125?&bg=111&fc=fff&text=???",
        socials: {},
    },
    {
        name: "Available",
        position: "Community Engagement Coordinator",
        image: "https://plchldr.co/i/125x125?&bg=111&fc=fff&text=???",
        socials: {},
    },
    {
        name: "Available",
        position: "DevOps Engineer",
        image: "https://plchldr.co/i/125x125?&bg=111&fc=fff&text=???",
        socials: {},
    },
    {
        name: "Available",
        position: "Junior Full Stack Engineer",
        image: "https://plchldr.co/i/125x125?&bg=111&fc=fff&text=???",
        socials: {},
    },
    {
        name: "Available",
        position: "Research Engineer",
        image: "https://plchldr.co/i/125x125?&bg=111&fc=fff&text=???",
        socials: {},
    },
]

export const meta = () => {
    return {
        title: "About | Ideoxan",
    }
}

export const loader = async ({ request }) => {
    // Check user auth
    let session = await supabaseLocalStrategy().checkSession(request)

    // If the user session is bad, redirect to the login page
    if (session) {
        let { user } = session
        if (!user || !user.id) throw redirect("/login")

        // If the user is authenticated, get the user's data from the database
        let { data: userData, error } = await supabaseAdmin()
            .from("user_data")
            .select()
            .eq("id", user.id)

        if (error) return json({ session: null, userData: null, error })

        if (userData) {
            return json({ session, userData: userData[0] })
        }
    }

    return json({ session: null, userData: null })
}

export default function BlogIndex() {
    let { session, userData } = useLoaderData()

    return (
        <>
            <NavigationBar session={session} userData={userData} />

            {/* Header */}
            <Header
                title={"More than just a platform"}
                subtitle={
                    "We are a community of passionate developers who are dedicated to building the best learning platform for everyone."
                }
            />

            {/* Mission */}
            <FadeInSection>
                <section className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col space-x-6 md:flex-row">
                        <div className="my-auto flex flex-col p-6 md:w-1/2">
                            <FadeInSection direction="right">
                                <h2 className="section-header">Our mission</h2>
                                <p className="font-style-paragraph mt-8 mb-4 md:mb-6">
                                    Ideoxan is committed to a future where everyone can learn
                                    programming with ease. It is essential for tomorrow's workforce
                                    to be armed with the tools of today. Through free and
                                    educational activities, students can be the technology leaders
                                    and innovators they were meant to be.
                                </p>
                                <p className="font-style-paragraph mt-8 mb-4 md:mb-6">
                                    A majority of the content provided by Ideoxan is free to use,
                                    edit, and redistribute. We made our website around this
                                    free-to-use and open source model to knock down the barriers
                                    present in other online courses. With free tools, everyone can
                                    be capable of discovering their love of computer science.
                                </p>
                            </FadeInSection>
                        </div>
                        <div className="hidden w-1/2 flex-shrink flex-grow-0 flex-col p-6 md:flex">
                            <img
                                src="/images/about_mission.jpg"
                                className="mx-auto my-auto w-auto flex-shrink"
                                alt=""
                            />
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* Team */}
            <FadeInSection>
                <section className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col space-x-6 md:flex-row">
                        <div className="my-auto flex w-full flex-col p-6">
                            <FadeInSection direction="right" disable={true}>
                                <h2 className="section-header mx-auto text-center">
                                    Meet the team
                                </h2>
                                <div className="mx-auto mt-8 flex w-full max-w-4xl flex-row flex-wrap justify-center">
                                    {teamData.map((member, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="mb-2 flex h-full w-56 flex-col hover:scale-105">
                                                <div className="h-full w-full p-4">
                                                    <img
                                                        src={member.image}
                                                        className="h-auto w-full rounded-lg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="px-4 pb-4">
                                                    <h3 className="mx-auto text-center font-sans text-lg font-semibold tracking-tight text-gray-50">
                                                        {member.name}
                                                    </h3>
                                                    <p className="mx-auto mt-1 w-full text-center font-mono text-2xs font-bold tracking-tight text-gray-50 opacity-50">
                                                        {member.position}
                                                    </p>
                                                    <div className="mx-auto mt-auto flex w-max flex-row justify-between space-x-4 pt-2">
                                                        {member.socials.github && (
                                                            <button
                                                                className="flex flex-row text-gray-50 opacity-50 hover:opacity-100"
                                                                onClick={() => {
                                                                    window.location =
                                                                        member.socials.github
                                                                }}>
                                                                <Github width={18} />
                                                            </button>
                                                        )}
                                                        {member.socials.twitter && (
                                                            <button
                                                                className="flex flex-row text-gray-50 opacity-50 hover:opacity-100"
                                                                onClick={() => {
                                                                    window.location =
                                                                        member.socials.twitter
                                                                }}>
                                                                <Twitter width={18} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* Careers */}
            <FadeInSection>
                <section className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col space-x-6 md:flex-row">
                        <div className="my-auto flex flex-col p-6 md:w-1/2">
                            <FadeInSection direction="right">
                                <h2 className="section-header">Oppritunity at Ideoxan</h2>
                                <p className="font-style-paragraph mt-8 mb-4 md:mb-6">
                                    Want to be a part of the future of computer science education?
                                    Ideoxan is an entirely remote project. We advocate for a
                                    balanced work environment, and we are always looking for
                                    talented people to join our team. We hire in 6-month intervals
                                    or as needed.
                                </p>
                                <p className="font-style-paragraph mt-8 mb-4 md:mb-6">
                                    Ideoxan is also actively working with our community and industry
                                    partners to create an internship program for high school and
                                    university students in the US. These internships will provide
                                    real world experience and allow students to gain valuable skills
                                    and knowledge.
                                </p>
                            </FadeInSection>
                        </div>
                        <div className="hidden w-1/2 flex-shrink flex-grow-0 flex-col p-6 md:flex">
                            <img
                                src="/images/about_careers.jpg"
                                className="mx-auto my-auto w-auto flex-shrink"
                                alt=""
                            />
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* Research */}
            <FadeInSection>
                <section className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col space-x-6 md:flex-row">
                        <div className="my-auto flex flex-col p-6 md:w-1/2">
                            <FadeInSection direction="right">
                                <h2 className="section-header">Beyond development</h2>
                                <p className="font-style-paragraph mt-8 mb-4 md:mb-6">
                                    Ideoxan is invested in the future of web technologies and
                                    computer science as a whole. We have made strides in the
                                    advancement of these technologies through research, education,
                                    and industry partnerships.
                                </p>
                                <p className="font-style-paragraph mt-8 mb-4 md:mb-6">
                                    We have developed complex systems that we rely on to help power
                                    our work. And, we are only getting started.
                                </p>
                                <h3 className="mt-8 mb-4 font-mono text-xs font-bold uppercase text-gray-50 opacity-50">
                                    Current Developments
                                </h3>
                                <div className="flex h-6 flex-row space-x-8 opacity-50">
                                    <img
                                        src="/images/ix_tesseractlogo_white_trans_272x63.png"
                                        className="h-full w-auto"
                                        alt=""
                                    />
                                    <img
                                        src="/images/ix_webvm_white_trans_247x37.png"
                                        className="h-full w-auto"
                                        alt=""
                                    />
                                    <img
                                        src="/images/ix_scql_white_trans_386x153.png"
                                        className="h-full w-auto"
                                        alt=""
                                    />
                                </div>
                            </FadeInSection>
                        </div>
                        <div className="hidden w-1/2 flex-shrink flex-grow-0 flex-col p-6 md:flex">
                            <img
                                src="/images/about_rd.jpg"
                                className="mx-auto my-auto w-auto flex-shrink"
                                alt=""
                            />
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* Outreach */}
            <FadeInSection>
                <section className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col space-x-6 md:flex-row">
                        <div className="my-auto flex flex-col p-6 md:w-1/2">
                            <FadeInSection direction="right">
                                <h2 className="section-header">Our responsibility</h2>
                                <p className="font-style-paragraph mt-8 mb-4 md:mb-6">
                                    In the modern age, technology is a necessity. In 2012, the
                                    United States Department of Education found that 16% of adults
                                    were digitally illiterate. This could mean that up to 41 million
                                    Americans do not know how to proficiently use some technological
                                    device. Ideoxan promotes the usage of our products and services
                                    to also provide digital literacy services.
                                </p>
                                <p className="font-style-paragraph mt-8 mb-4 md:mb-6">
                                    Ideoxan focuses not only on our local community, but also the
                                    global community. Through open source and FOSS (free and open
                                    source software) initiatives, Ideoxan has thrived. We emphasize
                                    on giving back to the very same community by keeping our promise
                                    of relying on open source technologies, staying free, and
                                    offering scholarships for academic institutions interested in
                                    our educational platform.
                                </p>
                            </FadeInSection>
                        </div>
                        <div className="hidden w-1/2 flex-shrink flex-grow-0 flex-col p-6 md:flex">
                            <img
                                src="/images/about_sr.jpg"
                                className="mx-auto my-auto w-auto flex-shrink"
                                alt=""
                            />
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* Open Source */}
            <OpenSourceSection />

            {/* Contact */}
            <FadeInSection>
                <section className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col space-x-6 md:flex-row">
                        <div className="my-auto flex w-full flex-col p-6">
                            <h2 className="section-header">Get in touch</h2>
                            <div className="flex flex-col md:flex-row">
                                <div className="flex flex-col pr-6 pb-6 md:w-1/3">
                                    <h3 className="bg-gradient-white mt-6 bg-clip-text pb-2 text-left font-sans text-lg font-bold tracking-tight text-gray-50 text-transparent md:text-xl">
                                        General Inquires
                                    </h3>
                                    <p className="font-style-paragraph mb-4 md:mb-6">
                                        Have any questions or concerns? Get in touch with us. For
                                        the fastest response, join our{" "}
                                        <a
                                            href="https://discord.gg/jxqKy6r"
                                            className="underline hover:no-underline">
                                            Discord
                                        </a>{" "}
                                        server and send us a message.
                                    </p>
                                    <div className="mt-auto flex flex-row opacity-70">
                                        <Icon
                                            name="Phone"
                                            width={4}
                                            height={4}
                                            color="gray-50 my-auto"
                                            strokeThickness={2}
                                        />
                                        <div className="ml-4 flex flex-col">
                                            <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                                +1 (929) 262 1699
                                            </p>
                                            <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                                Mon - Fri, 9am to 5pm EST
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-row opacity-70">
                                        <Icon
                                            name="Mail"
                                            width={4}
                                            height={4}
                                            color="gray-50 my-auto"
                                            strokeThickness={2}
                                        />
                                        <div className="ml-4 flex flex-col">
                                            <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                                hello@ideoxan.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col pr-6 pb-6 md:w-1/3">
                                    <h3 className="bg-gradient-white mt-6 bg-clip-text pb-2 text-left font-sans text-lg font-bold tracking-tight text-gray-50 text-transparent md:text-xl">
                                        Technical Support Line
                                    </h3>
                                    <p className="font-style-paragraph mb-4 md:mb-6">
                                        Are you experiencing a technical problem with the website?
                                        Is something broken? Need help?
                                    </p>
                                    <div className="mt-auto flex flex-row opacity-70">
                                        <Icon
                                            name="Phone"
                                            width={4}
                                            height={4}
                                            color="gray-50 my-auto"
                                            strokeThickness={2}
                                        />
                                        <div className="ml-4 flex flex-col">
                                            <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                                +1 (929) 262 1699
                                            </p>
                                            <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                                Mon - Fri, 9am to 5pm EST
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-row opacity-70">
                                        <Icon
                                            name="Mail"
                                            width={4}
                                            height={4}
                                            color="gray-50 my-auto"
                                            strokeThickness={2}
                                        />
                                        <div className="ml-4 flex flex-col">
                                            <p className="font-sans text-xs font-normal leading-5 text-gray-50 md:text-sm">
                                                support@ideoxan.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col pr-6 pb-6 md:w-1/3">
                                    <h3 className="bg-gradient-white mt-6 bg-clip-text pb-2 text-left font-sans text-lg font-bold tracking-tight text-gray-50 text-transparent md:text-xl">
                                        Socials
                                    </h3>
                                    <p className="font-style-paragraph mb-4 md:mb-6">
                                        Check out our social media profiles to stay up to date with
                                        the latest news.
                                    </p>
                                    <div className="mt-auto flex flex-row opacity-70">
                                        <Github width={16} className="my-auto text-gray-50" />
                                        <div className="ml-4 flex flex-col">
                                            <a
                                                href="https://github.com/ideoxan"
                                                className="font-sans text-xs font-normal leading-5 text-gray-50 underline hover:no-underline md:text-sm">
                                                GitHub
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-auto flex flex-row opacity-70">
                                        <Twitter width={16} className="my-auto text-gray-50" />
                                        <div className="ml-4 flex flex-col">
                                            <a
                                                href="https://twitter.com/ideoxan"
                                                className="font-sans text-xs font-normal leading-5 text-gray-50 underline hover:no-underline md:text-sm">
                                                Twitter
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-auto flex flex-row opacity-70">
                                        <Discord width={16} className="my-auto text-gray-50" />
                                        <div className="ml-4 flex flex-col">
                                            <a
                                                href="https://discord.gg/jxqKy6r"
                                                className="font-sans text-xs font-normal leading-5 text-gray-50 underline hover:no-underline md:text-sm">
                                                Discord
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeInSection>

            <Footer />
        </>
    )
}
