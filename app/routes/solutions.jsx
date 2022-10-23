import NavigationBar from "app/components/NavigationBar"
import Footer from "app/components/Footer"
import { json, redirect } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"
import FadeInSection from "app/components/FadeInSection"
import { Discord, Github, Twitter } from "@icons-pack/react-simple-icons"
import Icon from "app/components/Icon"
import ProductsItem from "app/components/Solutions/ProductsItem"

export const meta = () => {
    return {
        title: "Solutions | Ideoxan",
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

export default function Solutions() {
    let { session, userData } = useLoaderData()

    return (
        <>
            <NavigationBar session={session} userData={userData} />

            {/* Hero */}
            <FadeInSection>
                <header
                    id="hero"
                    className="flex w-full flex-col items-center justify-center overflow-y-visible bg-contain bg-center bg-no-repeat md:h-screen md:bg-img-hero">
                    <div className="flex max-w-full flex-row sm:mx-auto sm:max-w-lg md:max-w-7xl md:space-x-4">
                        {/* Header and tagline */}
                        <div className="mt-24 mb-0 flex w-full flex-col p-8 md:my-auto md:w-1/2">
                            <h1 className="glow-text-white max-w-sm text-left font-sans text-3xl font-extrabold tracking-tight sm:max-w-md sm:text-center sm:text-4xl md:max-w-full md:text-left md:text-5xl md:leading-[4rem]">
                                Advanced learning solutions for educators.
                            </h1>
                            <h2 className="mt-4 max-w-sm text-left font-sans text-sm font-semibold tracking-tight text-gray-50 opacity-80 sm:max-w-md sm:text-center sm:text-base md:max-w-full md:text-left md:text-lg">
                                Empower your students with the tools they need to succeed.
                            </h2>
                            {(global || window)?.env?.WORKER_ENV === "production" ? (
                                <a
                                    href="/waitlist"
                                    className="bttn bttn-round bttn-normal bttn-gradient box-glow-hover bttn-gradient-arrow mt-8 ml-0 sm:mr-auto sm:ml-auto md:ml-0">
                                    Join the Waitlist
                                </a>
                            ) : (
                                <a
                                    href="#contact"
                                    className="bttn bttn-round bttn-normal bttn-gradient box-glow-hover bttn-gradient-arrow mt-8 ml-0 sm:mr-auto sm:ml-auto md:ml-0">
                                    Contact Us
                                </a>
                            )}
                        </div>

                        {/* Hero image */}
                        <div className="mx-auto my-auto hidden w-1/2 flex-shrink flex-col p-16 md:flex">
                            <img
                                src="/images/ix_solutions_hero.png"
                                className="mx-auto h-auto w-full"
                                alt=""></img>
                        </div>
                    </div>
                </header>
            </FadeInSection>

            {/* Features */}
            <FadeInSection>
                <section className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col">
                        <h2 className="section-header mx-auto text-center">
                            A full suite of classroom tools
                        </h2>
                        <ul className="mx-auto mt-8 mb-4 grid w-full grid-flow-col grid-cols-3 gap-x-12 gap-y-12 md:mb-6">
                            <ProductsItem
                                icon="Landmark"
                                title="Classroom Management"
                                description="Manage your classroom with ease. Add new students, create custom assignments, assign quizzes, and more."
                            />
                            <ProductsItem
                                icon="RefreshCw"
                                title="Grade Syncing and SSO"
                                description="Sync grades with your favorite LMS like Canvas, Google Classroom, and more. Use SSO to log in with your school's credentials and reduce the burden on IT staff."
                            />
                            <ProductsItem
                                icon="Activity"
                                title="Student Progress Tracking"
                                description="Track student progress with our powerful analytics dashboard. See how students are doing on assignments, quizzes, and more."
                            />
                        </ul>
                    </div>
                </section>
            </FadeInSection>

            {/* Pricing */}
            <FadeInSection>
                <section className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col">
                        <h2 className="section-header mx-auto text-center">
                            Find a plan that works for you
                        </h2>
                        <div className="mx-auto mt-16 flex w-full flex-row">
                            <div className="flex w-1/3 flex-col rounded-2xl bg-gray-700 py-8 px-10 shadow-lg ring-1 ring-gray-500 ring-opacity-50">
                                <div className="mx-auto font-sans text-xs font-bold uppercase text-secondary">
                                    Individual
                                </div>
                                <h3 className="mt-8 text-center text-3xl font-bold text-gray-50">
                                    Free
                                </h3>
                                <p className="mx-auto mt-1 text-center text-xs font-bold text-gray-50 text-opacity-50"></p>
                                <p className="font-style-paragraph mx-auto mt-8 text-center text-xs">
                                    Good for individuals, homeschoolers, and small clubs interested
                                    in trying out Ideoxan.
                                </p>
                                <ul className="mx-auto mt-8 space-y-4 text-sm text-gray-50 text-opacity-90">
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Unlimited access to all lessons</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Community Suppport</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Ideoxan Reward Marketplace (Coming Soon)</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Standard and Third-Party Login</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Progress Tracking</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Always Free, Forever.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative z-10 flex w-1/3 scale-110 transform flex-col rounded-3xl border-2 border-primary bg-gray-700 px-10 pb-8 shadow-2xl ring-1 ring-gray-500 ring-opacity-50">
                                <div className="relative top-0 mx-auto mb-3 -translate-y-1/2 transform rounded-full bg-gradient-to-tr from-primary to-secondary px-3 pt-1 pb-1.5 text-xs font-bold uppercase text-gray-50">
                                    Popular
                                </div>
                                <div className="mx-auto font-sans text-xs font-bold uppercase text-secondary">
                                    EDU
                                </div>
                                <h3 className="mt-8 text-center text-3xl font-bold text-gray-50">
                                    USD $0.00<sup></sup>
                                </h3>
                                <p className="mx-auto mt-1 text-center text-xs font-bold text-gray-50 text-opacity-50">
                                    /month per Student<sup>*</sup>
                                </p>
                                <p className="font-style-paragraph mx-auto mt-8 text-center text-xs">
                                    Perfect for smaller educational institutions looking to add
                                    comprehensive computer science courses to their curriculum.
                                </p>
                                <ul className="mx-auto mt-8 space-y-4 text-sm text-gray-50 text-opacity-90">
                                    <li className="flex flex-row items-center">
                                        <span>In Addition to the Individual Plan...</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>
                                            Up to 3 Teachers and Unlimited Support Staff<sup>†</sup>
                                        </span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Clever SSO Integration</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Email and Phone Support</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Basic LMS</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Assignments and Quizzes</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Auto-Grading</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex w-1/3 flex-col rounded-2xl bg-gray-700 py-8 px-10 shadow-lg ring-1 ring-gray-500 ring-opacity-50">
                                <div className="mx-auto font-sans text-xs font-bold uppercase text-secondary">
                                    Enterprise (Coming Soon)
                                </div>
                                <h3 className="mt-8 text-center text-3xl font-bold text-gray-50">
                                    Contact Us
                                </h3>
                                <p className="font-style-paragraph mx-auto mt-8 text-center text-xs">
                                    Great for larger educational institutions and corporations.
                                </p>
                                <ul className="mx-auto mt-8 space-y-4 text-sm text-gray-50 text-opacity-90">
                                    <li className="flex flex-row items-center">
                                        <span>In Addition to the Basic Plan...</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Tailored Pricing</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Unlimited Teachers and Support Staff</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Support for custom OAuth/SSO/SAML</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>24/7/365 Full Premium Support</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Advanced LMS</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Canvas Grades Sync</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                        <span>Custom Assignments (Add-On)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-16 w-full">
                            <p className="mx-auto text-center text-2xs text-gray-50 text-opacity-20">
                                <sup>*</sup> Members under an organization are considered students
                                unless they are explicitly assigned a different role. Students are
                                billed as active when they have logged in at least once in the last
                                365 days.
                            </p>
                            <p className="mx-auto text-center text-2xs text-gray-50 text-opacity-20">
                                <sup>†</sup> Teachers are users over the age of 18 who are assigned
                                a non-student role and are considered by their jurisdiction to be
                                the instructional staff on hand for their assigned classroom under
                                the organization's academic institution. Support staff are users
                                over the age of 18 who are assigned by their jurisdiction/academic
                                intitution to provide supportive resources for teachers, assist with
                                technical services, are an assigned representative for the
                                organization, or otherwise fulfill a non-critical supportive role
                                within the organization. Teachers and Support Staff are always
                                billed as active.
                            </p>
                        </div>
                        <table className="mt-16 table w-full table-fixed border-collapse border-spacing-0">
                            <thead>
                                <tr className="bg-gray-700 text-left text-xs font-bold text-gray-50 text-opacity-50">
                                    <th className="px-8 py-4">Plans</th>
                                    <th className="px-8 py-4">Individual</th>
                                    <th className="px-8 py-4">EDU</th>
                                    <th className="px-8 py-4">Enterprise (Coming Soon)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="divide-x divide-gray-500 divide-opacity-50 border-b-0 border-gray-500 border-opacity-50 text-left text-sm font-medium text-gray-50 text-opacity-90">
                                    <td className="px-8 py-4 font-bold opacity-70">Price</td>
                                    <td className="px-8 py-4">$0/mo.</td>
                                    <td className="px-8 py-4">USD $0.00/student/mo.</td>
                                    <td className="px-8 py-4">Quote</td>
                                </tr>
                                <tr className="bg-gray-700 text-left text-sm font-bold text-gray-50 text-opacity-90">
                                    <th className="col-span-4 px-8 py-4">
                                        <div className="flex flex-row">
                                            <div className="mr-3 flex h-6 w-6 flex-shrink-0 flex-col rounded-md bg-gradient-to-tr from-primary to-secondary">
                                                <Icon name="Box" className="m-auto text-gray-50" />
                                            </div>
                                            <span className="my-auto">Core Features</span>
                                        </div>
                                    </th>
                                    <td className="col-span-4 px-8 py-4"></td>
                                    <td className="col-span-4 px-8 py-4"></td>
                                    <td className="col-span-4 px-8 py-4"></td>
                                </tr>
                                <tr className="divide-x divide-gray-500 divide-opacity-50 border-b-1 border-gray-500 border-opacity-50 text-left text-sm font-medium text-gray-50 text-opacity-90">
                                    <td className="px-8 py-4 font-bold opacity-70">
                                        Open Source Lessons
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                </tr>
                                <tr className="divide-x divide-gray-500 divide-opacity-50 border-b-1 border-gray-500 border-opacity-50 text-left text-sm font-medium text-gray-50 text-opacity-90">
                                    <td className="px-8 py-4 font-bold opacity-70">
                                        Knowledge Checkpoints (Quizzes)
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                </tr>
                                <tr className="divide-x divide-gray-500 divide-opacity-50 border-b-1 border-gray-500 border-opacity-50 text-left text-sm font-medium text-gray-50 text-opacity-90">
                                    <td className="px-8 py-4 font-bold opacity-70">
                                        Supplemental Articles
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                </tr>
                                <tr className="divide-x divide-gray-500 divide-opacity-50 border-b-0 border-gray-500 border-opacity-50 text-left text-sm font-medium text-gray-50 text-opacity-90">
                                    <td className="px-8 py-4 font-bold opacity-70">
                                        Supplemental Resources
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                </tr>
                                <tr className="bg-gray-700 text-left text-sm font-bold text-gray-50 text-opacity-90">
                                    <th className="col-span-4 px-8 py-4">
                                        <div className="flex flex-row">
                                            <div className="mr-3 flex h-6 w-6 flex-shrink-0 flex-col rounded-md bg-gradient-to-tr from-primary to-secondary">
                                                <Icon name="Lock" className="m-auto text-gray-50" />
                                            </div>
                                            <span className="my-auto">Authentication</span>
                                        </div>
                                    </th>
                                    <td className="col-span-4 px-8 py-4"></td>
                                    <td className="col-span-4 px-8 py-4"></td>
                                    <td className="col-span-4 px-8 py-4"></td>
                                </tr>
                                <tr className="divide-x divide-gray-500 divide-opacity-50 border-b-1 border-gray-500 border-opacity-50 text-left text-sm font-medium text-gray-50 text-opacity-90">
                                    <td className="px-8 py-4 font-bold opacity-70">
                                        Traditional Sign-On
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                </tr>
                                <tr className="divide-x divide-gray-500 divide-opacity-50 border-b-1 border-gray-500 border-opacity-50 text-left text-sm font-medium text-gray-50 text-opacity-90">
                                    <td className="px-8 py-4 font-bold opacity-70">
                                        Third Party OAuth
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                </tr>
                                <tr className="divide-x divide-gray-500 divide-opacity-50 border-b-1 border-gray-500 border-opacity-50 text-left text-sm font-medium text-gray-50 text-opacity-90">
                                    <td className="px-8 py-4 font-bold opacity-70">Clever SSO</td>
                                    <td className="px-8 py-4">
                                        <Icon
                                            name="Minus"
                                            className="mr-2 text-gray-50 opacity-50"
                                        />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon name="Check" className="mr-2 text-secondary" />
                                    </td>
                                </tr>
                                <tr className="divide-x divide-gray-500 divide-opacity-50 border-b-1 border-gray-500 border-opacity-50 text-left text-sm font-medium text-gray-50 text-opacity-90">
                                    <td className="px-8 py-4 font-bold opacity-70">
                                        Custom OAuth/SSO/SAML
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon
                                            name="Minus"
                                            className="mr-2 text-gray-50 opacity-50"
                                        />
                                    </td>
                                    <td className="px-8 py-4">
                                        <Icon
                                            name="Minus"
                                            className="mr-2 text-gray-50 opacity-50"
                                        />
                                    </td>
                                    <td className="px-8 py-4">
                                        <span className="opacity-60">Coming Soon</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </FadeInSection>

            {/* Contact */}
            <FadeInSection>
                <section
                    id="contact"
                    className="flex w-full flex-col overflow-hidden py-12 md:py-24">
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
