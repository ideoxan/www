import { Link, Outlet } from "@remix-run/react"
import { useEffect, useState } from "react"

export default function Auth({ ...props }) {
    const imgURL = "/images/signup_splash_edit.png"
    const [fade, setFade] = useState("")

    useEffect(() => {
        const img = new Image()
        img.onload = () => {
            setFade("animate-fade-in")
        }
        img.src = imgURL
    }, [])

    return (
        <main className="h-screen w-screen overflow-hidden bg-gray-900 md:bg-black" {...props}>
            {/* Splash image */}
            {/* //TODO: Convert png to jpg*/}
            <div className="h-full w-full opacity-30">
                {fade.length > 0 && (
                    <div
                        className={
                            "hidden h-full w-full animate-fade-in bg-[url('/images/signup_splash_edit.png')] bg-cover bg-center opacity-0 md:block"
                        }></div>
                )}
            </div>

            {/* Splash content */}
            <div
                className={
                    "absolute top-0 left-0 flex h-screen w-screen flex-row opacity-0 " + fade
                }>
                <div className="z-40 flex h-full w-full flex-col bg-gray-900 px-12 py-8 ring-gray-500 ring-opacity-20 md:mx-auto md:my-auto md:h-auto md:w-1/2 md:rounded-lg md:shadow-xl md:ring-1 xl:w-1/3 2xl:w-1/4">
                    <Outlet />
                </div>
            </div>

            {/* Logo */}
            <div
                className={
                    "absolute top-0 left-0 hidden h-max w-screen flex-row opacity-0 md:flex " + fade
                }>
                <Link id="nav-logo" className="mx-auto flex-shrink-0 py-8 opacity-50" to="/">
                    <img
                        src="/images/ix_logo_white_trans_253x50.png"
                        className="h-4 w-auto"
                        alt="Ideoxan Logo"></img>
                </Link>
            </div>

            {/* Attribution */}
            <div
                className={
                    "absolute bottom-0 left-0 hidden h-max w-screen flex-row opacity-0 md:flex " +
                    fade
                }>
                <p className="mx-auto py-8 text-center font-sans text-2xs font-medium text-gray-50 opacity-70">
                    Photo by{" "}
                    <a
                        className="underline"
                        href="https://unsplash.com/@orwhat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                        Richard Horvath
                    </a>{" "}
                    on{" "}
                    <a
                        className="underline"
                        href="https://unsplash.com/s/photos/abstract?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                        Unsplash
                    </a>
                </p>
            </div>
        </main>
    )
}
