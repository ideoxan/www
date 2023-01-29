import { useEffect, useRef, useState } from "react"
import { Terminal as Xterm } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import { io } from "socket.io-client"
import Icon from "app/components/Icon"

export default function Terminal({ session, userData, metadata, fs }) {
    // Grab ref to terminal elm
    const term = useRef(null)
    const socket = useRef(null)
    const loader = useRef(null)
    const [isRunning, setIsRunning] = useState(false)

    let spinners = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

    // Setup terminal
    useEffect(() => {
        ;(async () => {
            // Create terminal
            console.log("[Terminal] Creating terminal...")
            term.current = new Xterm({
                cursorBlink: true,
                bellSound: null,
                bellStyle: "none",
                cursorStyle: "block",
                //fontFamily: "Cascadia Code", // !: Cascadia seems to break a lot...
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
            window.addEventListener("resize", () => fitAddon.fit())
            fitAddon.fit()

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
                window.env.WORKER_ENV == "production"
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

    return (
        <div className="flex h-full w-full flex-shrink flex-grow flex-col overflow-hidden rounded-lg bg-black shadow-xl ring-1 ring-gray-500 ring-opacity-20">
            <div
                id="terminal"
                className="flex h-full w-full flex-shrink flex-grow flex-col overflow-hidden py-3 pl-3 pr-2"></div>
            <div className="relative bottom-0 z-10 mx-auto flex flex-row py-3 px-3">
                {socket?.current && session && userData && !isRunning && (
                    <Icon
                        name="Play"
                        width={4}
                        height={4}
                        color={"gray-50"}
                        strokeThickness={2}
                        className="my-auto cursor-pointer opacity-50 hover:opacity-100"
                        onClick={async () => {
                            setIsRunning(true)
                            let si = 0
                            term.current.write("\x1bcSetting up  ")
                            loader.current = setInterval(() => {
                                term.current.write("\b")
                                if (si >= spinners.length) si = 0
                                term.current.write(spinners[si++])
                            }, 80)
                            // Pack fs
                            const tar = await fs.pack({ dirPath: "/" })
                            socket.current.emit("tesseract_request", {
                                type: "run_request",
                                user: session.user.id,
                                environment: {
                                    on: metadata.lesson.environment.on,
                                    commands: metadata.lesson.environment.commands,
                                    workingDirectory: metadata.lesson.environment.working_directory,
                                },
                                workspace: "",
                                fs: tar,
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
