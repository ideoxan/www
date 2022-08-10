import { useState } from "react"
import Icon from "app/components/Icon"
import { Link } from "@remix-run/react"

export default function NavigationBar({ session, userData }) {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

    function toggleMobileNavMenu() {
        setIsMobileNavOpen(!isMobileNavOpen)
    }

    return (
        <>
            <nav
                id="nav"
                className="flex w-full min-w-full flex-row bg-gray-900 py-6 px-4 sm:px-12">
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
                    {/* <li className="hidden md:flex nav-link">
                        <Link to="/solutions">Solutions</Link>
                    </li> */}
                    <li className="nav-link hidden md:flex">
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li className="nav-link hidden md:flex">
                        <Link to="/about">About</Link>
                    </li>
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
                </ul>
            </nav>

            {/* Mobile Nav Menu Drop Down */}
            <div
                id="mobile-nav-menu"
                className="mt-6 hidden w-full flex-col bg-gray-800 px-4 py-12">
                <ul className="mx-8 flex flex-col space-y-4 text-left font-sans text-sm font-medium text-gray-50">
                    <li className="nav-link">
                        <Link to="/courses">Courses</Link>
                    </li>
                    {/* <li className="nav-link">
                        <Link to="/solutions">Solutions</Link>
                    </li> */}
                    <li className="nav-link hidden md:flex">
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/about">About</Link>
                    </li>
                    {session && userData && (
                        <li className="nav-link flex">
                            <Link to="/dashboard">Dashboard</Link>=
                        </li>
                    )}
                    {session && userData && (
                        <li className="nav-link flex">
                            <Link to="/logout">Logout</Link>=
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
                </ul>
            </div>
        </>
    )
}
