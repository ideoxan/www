import { useEffect, useRef, useState } from "react"
import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import { io } from "socket.io-client"
import Icon from "app/components/Icon"

export default function Console({ session, userData, metadata }) {
    // Grab ref to terminal elm
    const term = useRef(null)
    const socket = useRef(null)
    const loader = useRef(null)
    const [isRunning, setIsRunning] = useState(false)

    let spinners = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

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
            ch = 16 * 1.0
        // Calculate terminal size
        let c = Math.floor(iw / cw)
        let r = Math.floor(ih / ch)
        // Set terminal size
        term.current.resize(c, r)
        //console.log(px, px, iw, ih, cw, ch, c, r)
    }

    // Setup terminal
    useEffect(() => {
        ;(async () => {
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
                convertEol: true,
            })

            // Load addons
            console.log("[Terminal] Loading addons...")
            const fitAddon = new FitAddon()
            term.current.loadAddon(fitAddon)

            // Attach terminal to DOM
            term.current.open(document.querySelector("#terminal"))

            // Resize terminal on window resize
            window.addEventListener("resize", () =>
                handleResize(document.querySelector("#terminal"))
            )

            // Inform of impending loading
            console.log("[Terminal] Loading...")
            let li = 0
            term.current.write("Loading  ")
            loader.current = setInterval(() => {
                term.current.write("\b")
                if (li >= spinners.length) li = 0
                term.current.write(spinners[li++])
            }, 80)

            if (!session || !userData) {
                console.log("[Terminal] No session or user data, closing terminal (fast fail)...")
                return authFail()
            }

            // Connect to socket
            const connectionURL =
                window.env.NODE_ENV == "production"
                    ? "https://" + session.user.id + "." + window.env.TESSERACT_URL
                    : "http://localhost:5972"

            console.log("[Terminal] Connecting to socket (" + connectionURL + ")...")

            socket.current = io(connectionURL, {
                auth: {
                    token: session.access_token,
                },
            })

            // Listen for socket events
            socket.current.on("connect", () => {
                console.log("[Terminal] Connected.")
                setTimeout(() => {
                    clearInterval(loader.current)
                    term.current.write("\x1b[H\x1b[2J")
                    term.current.write("\u001b[32;1mConnected.\x1b[0m\r\n")
                }, 2000)
            })

            socket.current.on("disconnect", () => {
                console.log("[Terminal] Disconnected.")
                setIsRunning(false)
            })

            socket.current.on("connect_error", err => {
                console.error("[Terminal] Connect error:", err)
                setIsRunning(false)
                return fastFail()
            })

            socket.current.on("tesseract_exec_stdout", data => {
                term.current.write(data)
            })

            socket.current.on("tesseract_exec_stderr", data => {
                term.current.write(data)
            })

            socket.current.on("tesseract_exec_end", data => {
                term.current.write("\r\n")
                setIsRunning(false)
            })

            socket.current.on("tesseract_exec_error", ({ error }) => {
                console.error(error)
                setIsRunning(false)
            })

            socket.current.on("tesseract_request_error", ({ error }) => {
                term.current.write("\x1bcError running: " + error + "\r\n")
                console.error(error)
                clearInterval(loader.current)
                setIsRunning(false)
            })

            function authFail() {
                clearInterval(loader.current)
                term.current.write("\x1b[H\x1b[2J")
                term.current.write("\x1b[41;1m ERROR: \x1b[0m Unable to load console.\r\n")
                term.current.write(
                    "\x1b[41;1m ERROR: \x1b[0m Looks like you're not logged in.\r\n\r\n"
                )
                term.current.write(
                    "\x1b[33;1mIf you want to be able to run your code, save your\r\n"
                )
                term.current.write("progress, and advance through this course, log in\r\n")
                term.current.write("or sign up for an account.\r\n\r\n")
                term.current.write("https://ideoxan.com/login\r\n")
                term.current.write("\t - or -\r\n")
                term.current.write("https://ideoxan.com/signup\r\n\x1b[0m")
                term.current.write("\r\n\r\n(Process exited with code -1) ")
                return
            }

            function fastFail() {
                clearInterval(loader.current)
                term.current.write("\x1b[H\x1b[2J")
                term.current.write("\x1b[41;1m ERROR: \x1b[0m Unable to load console.\r\n\x1b[0m")
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
            <div
                id="terminal"
                className="flex flex-col h-full w-full pl-3 pr-2 pt-3 flex-shrink"
            ></div>
            <div className="relative flex flex-row bottom-0 py-3 px-3 mx-auto z-10">
                {socket?.current && session && userData && !isRunning && (
                    <Icon
                        name="Play"
                        width={4}
                        height={4}
                        color={"gray-50"}
                        strokeThickness={2}
                        className="my-auto opacity-50 hover:opacity-100 cursor-pointer"
                        onClick={() => {
                            setIsRunning(true)
                            let si = 0
                            term.current.write("\x1bcSetting up  ")
                            loader.current = setInterval(() => {
                                term.current.write("\b")
                                if (si >= spinners.length) si = 0
                                term.current.write(spinners[si++])
                            }, 80)
                            socket.current.emit("tesseract_request", {
                                type: "run_request",
                                user: session.user.id,
                                environment: {
                                    on: metadata.lesson.environment.on,
                                    commands: metadata.lesson.environment.commands,
                                },
                                workspace: "",
                            })
                            socket.current.on("tesseract_request_ok", data => {
                                clearInterval(loader.current)
                                let ri = 0
                                term.current.write("\x1bcRunning  ")
                                loader.current = setInterval(() => {
                                    term.current.write("\b")
                                    if (ri >= spinners.length) ri = 0
                                    term.current.write(spinners[ri++])
                                }, 80)
                                socket.current.on("tesseract_exec_start", data => {
                                    clearInterval(loader.current)
                                    term.current.write("\x1bc")
                                })
                            })
                        }}
                    />
                )}
            </div>
        </div>
    )
}
