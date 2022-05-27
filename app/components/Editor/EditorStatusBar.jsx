
export default function EditorStatusBar() {
    return (
        <footer className="flex flex-row w-full bg-gray-700 py-1 px-6 border-t border-t-gray-500 border-opacity-20">
            <div className="flex flex-row mr-auto space-x-8">
                {/* Connection Status */}
                <div className="flex flex-row w-max">
                    <p className="font-sans font-semibold text-left text-3xs text-gray-50 opacity-50 tracking-tight">Connected to Ideoxan</p>
                </div>

                {/* Editor Status */}
                <div className="flex flex-row">
                    <p className="font-sans font-semibold text-left text-3xs text-gray-50 opacity-50 tracking-tight">Balkan Editor v0.1.6</p>
                </div>

                {/* Ace Status */}
                <div className="flex flex-row">
                    <p className="font-sans font-semibold text-left text-3xs text-gray-50 opacity-50 tracking-tight">Ace Editor Legacy Compatibility Mode Enabled</p>
                </div>
            </div>

            <div className="flex flex-row ml-auto space-x-8">
                {/* Project Status */}
                <div className="flex flex-row">
                    <p className="font-sans font-semibold text-left text-3xs text-gray-50 opacity-50 tracking-tight">Line 5, Col 1</p>
                </div>

                <div className="flex flex-row">
                    <p className="font-sans font-semibold text-left text-3xs text-gray-50 opacity-50 tracking-tight">Hypertext Markup Language</p>
                </div>

                <div className="flex flex-row">
                    <p className="font-sans font-semibold text-left text-3xs text-gray-50 opacity-50 tracking-tight">Tab Size: 4 Spaces</p>
                </div>

                <div className="flex flex-row">
                    <p className="font-sans font-semibold text-left text-3xs text-gray-50 opacity-50 tracking-tight">UTF-8</p>
                </div>
            </div>
        </footer>
    )
}
