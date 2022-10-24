import { useState } from "react"
import Icon from "app/components/Icon"
import { Link } from "@remix-run/react"
import FadeInSection from "app/components/FadeInSection"

export default function NavigationBar({ session, userData }) {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    function toggleMobileNavMenu() {
        setIsMobileNavOpen(!isMobileNavOpen)
    }

    return (
        <>
            <nav
                id="nav"
                className="absolute top-0 left-0 z-40 flex w-full min-w-full flex-row bg-transparent py-6 px-4 sm:px-12">
                {/* Mobile Menu */}
                <div id="mobile-nav-menu-icon" className="flex md:hidden">
                    <button onClick={toggleMobileNavMenu}>
                        <Icon
                            name="Menu"
                            width={4}
                            height={4}
                            color="gray-50"
                            strokeThickness={2}
                            className="nav-link"
                        />
                    </button>
                </div>

                {/* Logo */}
                <Link
                    id="nav-logo"
                    className="ml-2 mr-auto flex flex-shrink-0 flex-row md:ml-0"
                    to="/">
                    <img
                        src="/images/ix_logo_white_trans_253x50.png"
                        className="h-4 w-auto"
                        alt="Ideoxan Logo"></img>
                </Link>

                {/* Clickable Nav Links */}
                <ul
                    id="nav-content"
                    className="flex flex-row text-center font-sans text-sm font-medium text-gray-50 md:space-x-12">
                    <li className="nav-link hidden md:flex">
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li className="nav-link hidden md:flex">
                        <Link to="/solutions">Solutions</Link>
                    </li>
                    <li className="nav-link hidden md:flex">
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li className="nav-link hidden md:flex">
                        <Link to="/about">About</Link>
                    </li>
                    {(global || window)?.env?.WORKER_ENV === "production" ? (
                        <li className="nav-link bg-gradient-multi glow-text-white bttn-gradient-arrow hidden bg-clip-text text-gray-50 text-transparent opacity-100 md:flex">
                            <Link to="/waitlist">Join the Waitlist</Link>
                        </li>
                    ) : (
                        <>
                            {session && userData && (
                                <li className="nav-link hidden md:flex">
                                    <Link to="/dashboard">Dashboard</Link>
                                    {/* <button>
                                        <Icon
                                            name="User"
                                            width={4}
                                            height={4}
                                            color="gray-50"
                                            strokeThickness={2}
                                        />
                                    </button> */}
                                </li>
                            )}
                            {session && userData && (
                                <li className="nav-link hidden md:flex">
                                    <Link to="/logout">Logout</Link>
                                </li>
                            )}
                            {!session && (
                                <li className="nav-link hidden md:flex">
                                    <Link to="/login">Login</Link>
                                </li>
                            )}
                            {!session && (
                                <li className="nav-link hidden md:flex">
                                    <Link to="/signup">Sign Up</Link>
                                </li>
                            )}
                        </>
                    )}
                </ul>
            </nav>

            {/* Mobile Nav Menu Drop Down */}
            {isMobileNavOpen && (
                <FadeInSection
                    direction="up"
                    threshold={0}
                    id="mobile-nav-menu"
                    className="flex w-full flex-col bg-gray-800 px-4 pt-20 pb-10">
                    <ul className="mx-8 flex flex-col space-y-5 text-left font-sans text-sm font-medium text-gray-50">
                        <li className="nav-link">
                            <Link to="/courses">Courses</Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/solutions">Solutions</Link>
                        </li>
                        <li className="nav-link hidden md:flex">
                            <Link to="/blog">Blog</Link>
                        </li>
                        <li className="nav-link">
                            <Link to="/about">About</Link>
                        </li>
                        {(global || window)?.env?.WORKER_ENV === "production" ? (
                            <li className="nav-link bg-gradient-multi glow-text-white bttn-gradient-arrow flex bg-clip-text text-gray-50 text-transparent opacity-100">
                                <Link to="/waitlist">Join the Waitlist</Link>
                            </li>
                        ) : (
                            <>
                                {session && userData && (
                                    <li className="nav-link hidden md:flex">
                                        <Link to="/dashboard">Dashboard</Link>
                                        {/* <button>
                                        <Icon
                                            name="User"
                                            width={4}
                                            height={4}
                                            color="gray-50"
                                            strokeThickness={2}
                                        />
                                    </button> */}
                                    </li>
                                )}
                                {session && userData && (
                                    <li className="nav-link flex">
                                        <Link to="/logout">Logout</Link>
                                    </li>
                                )}
                                {!session && (
                                    <li className="nav-link flex">
                                        <Link to="/login">Login</Link>
                                    </li>
                                )}
                                {!session && (
                                    <li className="nav-link flex">
                                        <Link to="/signup">Sign Up</Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </FadeInSection>
            )}
        </>
    )
}
