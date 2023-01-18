export default function EditorStatusBar() {
    return (
        <footer className="flex w-full flex-shrink-0 flex-row border-t border-t-gray-500 border-opacity-20 bg-gray-700 py-1 px-6">
            <div className="mr-auto flex flex-row space-x-8">
                {/* Connection Status */}
                <div className="flex w-max flex-row">
                    <p className="text-left font-sans text-3xs font-semibold tracking-tight text-gray-50 opacity-50">
                        Connected to Ideoxan
                    </p>
                </div>

                {/* Editor Status */}
                <div className="flex flex-row">
                    <p className="text-left font-sans text-3xs font-semibold tracking-tight text-gray-50 opacity-50">
                        Balkan Editor v0.1.6
                    </p>
                </div>

                {/* Ace Status */}
                <div className="flex flex-row">
                    <p className="text-left font-sans text-3xs font-semibold tracking-tight text-gray-50 opacity-50">
                        Ace Editor Legacy Compatibility Mode Enabled
                    </p>
                </div>
            </div>

            <div className="ml-auto flex flex-row space-x-8">
                {/* Project Status */}
                <div className="flex flex-row">
                    <p className="text-left font-sans text-3xs font-semibold tracking-tight text-gray-50 opacity-50">
                        Line 5, Col 1
                    </p>
                </div>

                <div className="flex flex-row">
                    <p className="text-left font-sans text-3xs font-semibold tracking-tight text-gray-50 opacity-50">
                        Hypertext Markup Language
                    </p>
                </div>

                <div className="flex flex-row">
                    <p className="text-left font-sans text-3xs font-semibold tracking-tight text-gray-50 opacity-50">
                        Tab Size: 4 Spaces
                    </p>
                </div>

                <div className="flex flex-row">
                    <p className="text-left font-sans text-3xs font-semibold tracking-tight text-gray-50 opacity-50">
                        UTF-8
                    </p>
                </div>
            </div>
        </footer>
    )
}
