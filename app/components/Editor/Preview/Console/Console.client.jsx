import { useEffect, useRef } from "react"
import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"

export default function Console() {
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

        // Resize terminal on window resize
        window.addEventListener("resize", () => handleResize(document.querySelector("#terminal")))
    }, [])

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
