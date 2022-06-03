import { Link } from "@remix-run/react"

export default function AuthScreen({ children, ...props }) {
    return (
        <main className="w-screen h-screen overflow-hidden bg-black" {...props}>

            {/* Splash image */}
            {/* //TODO: Convert png to jpg*/}
            <img src="/images/signup_splash_edit.png" alt="" className="opacity-30" />

            {/* Splash content */}
            <div className="absolute top-0 left-0 w-screen h-screen flex flex-row">

                <div className="flex flex-col w-1/4 mx-auto my-auto px-12 py-8 bg-gray-900 ring-1 ring-gray-500 ring-opacity-20 shadow-xl rounded-lg">

                    {children}
                </div>

            </div>

            {/* Logo */}
            <div className="absolute top-0 left-0 w-screen h-max flex flex-row">

                <Link id="nav-logo" className="mx-auto py-8 opacity-50 flex-shrink-0" to="/">

                    <img src="/images/ix_logo_white_trans_253x50.png" className="w-auto h-4" alt="Ideoxan Logo"></img>

                </Link>

            </div>

            {/* Attribution */}
            <div className="absolute bottom-0 left-0 w-screen h-max flex flex-row">

                <p className="mx-auto py-8 font-sans font-medium text-center text-2xs text-gray-50 opacity-70">Photo by <a className="underline" href="https://unsplash.com/@orwhat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Richard Horvath</a> on <a className="underline" href="https://unsplash.com/s/photos/abstract?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>

            </div>

        </main>
    )
}
