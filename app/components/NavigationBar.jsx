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
                className="flex flex-row py-6 bg-gray-900 min-w-full w-full px-4 sm:px-12">
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
                    className="flex flex-row ml-2 md:ml-0 mr-auto flex-shrink-0"
                    to="/">
                    <img
                        src="/images/ix_logo_white_trans_253x50.png"
                        className="w-auto h-4"
                        alt="Ideoxan Logo"></img>
                </Link>

                {/* Clickable Nav Links */}
                <ul
                    id="nav-content"
                    className="flex flex-row font-sans font-medium text-sm text-center text-gray-50 md:space-x-12">
                    <li className="hidden md:flex nav-link">
                        <Link to="/courses">Courses</Link>
                    </li>
                    {/* <li className="hidden md:flex nav-link">
                        <Link to="/solutions">Solutions</Link>
                    </li> */}
                    <li className="hidden md:flex nav-link">
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li className="hidden md:flex nav-link">
                        <Link to="/about">About</Link>
                    </li>
                    {session && userData && (
                        <li className="hidden md:flex nav-link">
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
                        <li className="hidden md:flex nav-link">
                            <Link to="/logout">Logout</Link>
                        </li>
                    )}
                    {!session && (
                        <li className="hidden md:flex nav-link">
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                    {!session && (
                        <li className="hidden md:flex nav-link">
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    )}
                </ul>
            </nav>

            {/* Mobile Nav Menu Drop Down */}
            <div
                id="mobile-nav-menu"
                className="hidden flex-col w-full bg-gray-800 px-4 py-12 mt-6">
                <ul className="flex flex-col mx-8 font-sans font-medium text-sm text-left text-gray-50 space-y-4">
                    <li className="nav-link">
                        <Link to="/courses">Courses</Link>
                    </li>
                    {/* <li className="nav-link">
                        <Link to="/solutions">Solutions</Link>
                    </li> */}
                    <li className="hidden md:flex nav-link">
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/about">About</Link>
                    </li>
                    {session && userData && (
                        <li className="flex nav-link">
                            <Link to="/dashboard">Dashboard</Link>=
                        </li>
                    )}
                    {session && userData && (
                        <li className="flex nav-link">
                            <Link to="/logout">Logout</Link>=
                        </li>
                    )}
                    {!session && (
                        <li className="flex nav-link">
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                    {!session && (
                        <li className="flex nav-link">
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}
