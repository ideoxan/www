import { useEffect, useRef } from "react"
import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import { io } from "socket.io-client"

export default function Console({ session, userData }) {
    // Grab ref to terminal elm
    const term = useRef(null)

    function handleResize(e) {
        // Styles
        let s = window.getComputedStyle(e)
        // Take padding into consideration
        let px = parseFloat(s.paddingLeft.split("px")[0]),
            py = parseFloat(s.paddingTop.split("px")[0])
        // True values
        let iw = e.clientWidth - px,
            ih = e.clientHeight - py
        // Find out how big a character actually is
        let cw = 7.166666666666667,
            ch = 16
        // Calculate terminal size
        let c = Math.floor(iw / cw)
        let r = Math.floor(ih / ch)
        // Set terminal size
        term.current.resize(c, r)
        //console.log(px, px, iw, ih, cw, ch, c, r)
    }

    // Setup terminal
    useEffect(() => {
        // Create terminal
        term.current = new Terminal({
            cursorBlink: true,
            bellSound: null,
            bellStyle: "none",
            cursorStyle: "block",
            fontFamily: "Cascadia Code",
            fontSize: 12,
            fontWeight: "normal"
        })

        // Load addons
        const fitAddon = new FitAddon()
        term.current.loadAddon(fitAddon)

        // Attach terminal to DOM
        term.current.open(document.querySelector("#terminal"))

        // Inform of impending loading
        let li = 0
        let spinners = ["|", "/", "-", "\\"]
        term.current.write("Loading...  ")
        let loader = setInterval(() => {
            term.current.write("\b")
            if (li >= spinners.length) li = 0
            term.current.write(spinners[li++])
        }, 100)

        // Resize terminal on window resize
        window.addEventListener("resize", () => handleResize(document.querySelector("#terminal")))

        if (!session || !userData) {
            clearTimeout(loader)
            term.current.write("\x1b[2K\r")
            term.current.write("\x1b[41;1m ERROR: \x1b[0m Unable to load console.\r\n")
            term.current.write("\x1b[41;1m ERROR: \x1b[0m Looks like you're not logged in.\r\n\r\n")
            term.current.write("\x1b[33;1mIf you want to be able to run your code, save your\r\n")
            term.current.write("progress, and advance through this course, log in\r\n")
            term.current.write("or sign up for an account.\r\n\r\n")
            term.current.write("https://ideoxan.com/login\r\n")
            term.current.write("\t - or -\r\n")
            term.current.write("https://ideoxan.com/signup\r\n\x1b[0m")
            term.current.write("\r\n\r\n(Process exited with code -1) ")
            return
        }

        const socket = io(
            (window.env.NODE_ENV == "production") ?
                "https://" + session.user.id + "." + window.env.TESSERACT_URL
                :
                "http://localhost:5972"
        )
    }, [session, userData])

    // Resizing
    useEffect(() => {
        handleResize(document.querySelector("#terminal"))
    })

    return (
        <div className="flex flex-col h-full w-full rounded-lg ring-1 ring-gray-500 ring-opacity-20 shadow-xl bg-black">
            <div id="terminal" className="flex flex-col h-full w-full px-2 py-3 flex-shrink">

            </div>
        </div>
    )
}
