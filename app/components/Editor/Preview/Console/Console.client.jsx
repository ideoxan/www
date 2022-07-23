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
        let iw = e.clientWidth - (2 * px),
            ih = e.clientHeight - (2 * py)
        // Find out how big a character actually is
        let cw = 7.166666666666667,
            ch = 16 * 1.1
        // Calculate terminal size
        let c = Math.floor(iw / cw)
        let r = Math.floor(ih / ch)
        // Set terminal size
        term.current.resize(c, r)
        //console.log(px, px, iw, ih, cw, ch, c, r)
    }

    // Setup terminal
    useEffect(() => {
        (async () => {
            // Create terminal
            console.log("[Terminal] Creating terminal...")
            term.current = new Terminal({
                cursorBlink: true,
                bellSound: null,
                bellStyle: "none",
                cursorStyle: "block",
                fontFamily: "Cascadia Code",
                fontSize: 12,
                fontWeight: "normal",
                lineHeight: 1.1,
            })

            // Load addons
            console.log("[Terminal] Loading addons...")
            const fitAddon = new FitAddon()
            term.current.loadAddon(fitAddon)

            // Attach terminal to DOM
            term.current.open(document.querySelector("#terminal"))

            // Resize terminal on window resize
            window.addEventListener("resize", () => handleResize(document.querySelector("#terminal")))

            // Inform of impending loading
            console.log("[Terminal] Loading...")
            let li = 0
            let spinners = ["|", "/", "-", "\\"]
            term.current.write("Loading...  ")
            let loader = setInterval(() => {
                term.current.write("\b")
                if (li >= spinners.length) li = 0
                term.current.write(spinners[li++])
            }, 100)

            if (!session || !userData) {
                console.log("[Terminal] No session or user data, closing terminal (fast fail)...")
                return fastFail()
            }

            // Connect to socket
            const connectionURL = (window.env.NODE_ENV == "production") ? "https://" + session.user.id + "." + window.env.TESSERACT_URL : "http://localhost:5972"

            console.log("[Terminal] Connecting to socket (" + connectionURL + ")...")

            const socket = io(connectionURL, {
                auth: {
                    token: session.access_token
                }
            })

            // Listen for socket events
            socket.on("connect", () => {
                console.log("[Terminal] Connected.")
                setTimeout(() => {
                    clearInterval(loader)
                    term.current.write("\x1b[H\x1b[2J")
                    term.current.write("Connected.\r\n")
                }, 2000)
            })

            socket.on("disconnect", () => {
                console.log("[Terminal] Disconnected.")
            })

            socket.on("connect_error", (err) => {
                console.error("[Terminal] Connect error:", err)
                return fastFail()
            })

            function fastFail() {
                clearInterval(loader)
                term.current.write("\x1b[H\x1b[2J")
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
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Resizing
    useEffect(() => {
        handleResize(document.querySelector("#terminal"))
    })

    return (
        <div className="flex flex-col h-full w-full rounded-lg ring-1 ring-gray-500 ring-opacity-20 shadow-xl bg-black">
            <div id="terminal" className="flex flex-col h-full w-full px-3 py-3 flex-shrink">

            </div>
        </div>
    )
}
