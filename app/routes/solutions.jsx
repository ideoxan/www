import NavigationBar from "app/components/NavigationBar"
import Footer from "app/components/Footer"
import { json, redirect } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { supabaseLocalStrategy } from "app/utils/auth.server.js"
import { supabaseAdmin } from "app/utils/db.server.js"
import FadeInSection from "app/components/FadeInSection"
import Icon from "app/components/Icon"
import ProductsItem from "app/components/Solutions/ProductsItem"
import PricingTableHeader from "app/components/Solutions/PricingTableHeader"
import PricingTableCell from "app/components/Solutions/PricingTableCell"
import PricingTableRowHeader from "app/components/Solutions/PricingTableRowHeader"
import PricingTableFeatureIncluded from "app/components/Solutions/PricingTableFeatureIncluded"
import PricingTableFeatureExcluded from "app/components/Solutions/PricingTableFeatureExcluded"
import PricingTableRow from "app/components/Solutions/PricingTableRow"
import ContactSection from "app/components/Shared/ContactSection"

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
                        <ul className="mx-auto mt-6 mb-4 flex w-full max-w-full flex-col space-y-6 sm:max-w-lg md:mt-8 md:mb-6 lg:max-w-7xl lg:flex-row lg:space-x-12 lg:space-y-0">
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
                        <div className="mx-auto mt-16 flex w-full max-w-full flex-col px-8 sm:mx-auto sm:max-w-lg lg:max-w-7xl lg:flex-row">
                            <div className="mx-auto flex w-full flex-col rounded-2xl bg-gray-700 px-10 pt-8 pb-16 shadow-lg ring-1 ring-gray-500 ring-opacity-50 lg:w-1/3 lg:pb-8">
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
                            <div className="relative z-10 mx-auto flex w-full scale-110 transform flex-col rounded-3xl border-2 border-primary bg-gray-700 px-10 pb-8 shadow-2xl ring-1 ring-gray-500 ring-opacity-50 lg:mx-0 lg:w-1/3">
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
                            <div className="mx-auto flex w-full flex-col rounded-2xl bg-gray-700 px-10 pb-8 pt-16 shadow-lg ring-1 ring-gray-500 ring-opacity-50 md:mx-0 lg:w-1/3 lg:pt-8">
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
                    </div>
                </section>
            </FadeInSection>

            {/* Extended Pricing Table */}
            <FadeInSection threshold={0.2}>
                <section className="flex w-full flex-col overflow-hidden py-12 md:py-24">
                    <div className="mx-auto flex w-full max-w-7xl flex-col">
                        <table className="mx-8 block w-full max-w-fit shrink-0 table-fixed border-collapse border-spacing-0 overflow-x-auto whitespace-nowrap text-gray-50 text-opacity-100 md:mx-auto md:table md:max-w-full md:overflow-x-auto md:whitespace-normal">
                            <thead>
                                <PricingTableRow
                                    header={true}
                                    bottomBorder={false}
                                    innerDivider={false}>
                                    <PricingTableCell>Plans</PricingTableCell>
                                    <PricingTableCell>Individual</PricingTableCell>
                                    <PricingTableCell>EDU</PricingTableCell>
                                    <PricingTableCell>Enterprise (Coming Soon)</PricingTableCell>
                                </PricingTableRow>
                            </thead>
                            <tbody>
                                <PricingTableRow bottomBorder={false}>
                                    <PricingTableRowHeader>Price</PricingTableRowHeader>
                                    <PricingTableCell>$0/mo.</PricingTableCell>
                                    <PricingTableCell>
                                        USD $0.00/mo. per student<sup>*</sup>
                                    </PricingTableCell>
                                    <PricingTableCell>Quote</PricingTableCell>
                                </PricingTableRow>
                                <PricingTableHeader icon="Box" title="Core Features" />
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Open Source Lessons
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Knowledge Checkpoints (Quizzes)
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Supplemental Articles
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow bottomBorder={false}>
                                    <PricingTableRowHeader>
                                        Additional Learning Resources
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableHeader icon="Lock" title="Authentication" />
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Traditional Sign-On
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>Third-Party OAuth</PricingTableRowHeader>
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>Clever SSO</PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow bottomBorder={false}>
                                    <PricingTableRowHeader>
                                        Custom OAuth/SSO/SAML
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureExcluded />
                                    <PricingTableCell>Coming Soon</PricingTableCell>
                                </PricingTableRow>
                                <PricingTableHeader
                                    icon="Gauge"
                                    title="Learning Management System (LMS)"
                                />
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Maximum Number of Students<sup>*</sup>
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableCell>Unlimited</PricingTableCell>
                                    <PricingTableCell>Unlimited</PricingTableCell>
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Maximum Number of Teachers<sup>†</sup>
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableCell>5</PricingTableCell>
                                    <PricingTableCell>Unlimited</PricingTableCell>
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Maximum Number of Support Staff<sup>†</sup>
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableCell>Unlimited</PricingTableCell>
                                    <PricingTableCell>Unlimited</PricingTableCell>
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Individual Progress Tracking
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>Auto Grading</PricingTableRowHeader>
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>Assigned Lessons</PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>Assigned Quizzes</PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>Assigned Readings</PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Custom Assignments
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureExcluded />
                                    <PricingTableCell>Add-On</PricingTableCell>
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>Custom Quizzes</PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureExcluded />
                                    <PricingTableCell>Add-On</PricingTableCell>
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Overall Class Performance Metrics
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Individual Student Performance Metrics
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Canvas Grades Sync
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        AI-Powered Student Recommendations
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow bottomBorder={false}>
                                    <PricingTableRowHeader>
                                        On-Demand Course Specific Materials
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableHeader icon="Terminal" title="Code Runner" />
                                <PricingTableRow bottomBorder={false}>
                                    <PricingTableRowHeader>
                                        Maximum Invocations Per Day
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableCell>
                                        1,000 included, then $0.04 per invocation
                                    </PricingTableCell>
                                    <PricingTableCell>Unlimited</PricingTableCell>
                                </PricingTableRow>
                                <PricingTableHeader icon="LifeBuoy" title="Support" />
                                <PricingTableRow>
                                    <PricingTableRowHeader>Community Support</PricingTableRowHeader>
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>Email Support</PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>Phone Support</PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>Dedicated Support</PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>99% SLA</PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                                <PricingTableRow>
                                    <PricingTableRowHeader>
                                        Onboarding Support
                                    </PricingTableRowHeader>
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureExcluded />
                                    <PricingTableFeatureIncluded />
                                </PricingTableRow>
                            </tbody>
                        </table>
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
                    </div>
                </section>
            </FadeInSection>

            {/* Contact */}
            <ContactSection />

            <Footer />
        </>
    )
}
