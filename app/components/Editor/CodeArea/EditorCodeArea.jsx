import Monaco from "@monaco-editor/react"
import { useState } from "react"

export default function EditorCodeArea({ onChange, language, code, theme, ...props }) {
    const [value, setValue] = useState(code || "")

    return (
        <div className="overflow-hidden flex flex-col max-h-full h-full w-full rounded-lg ring-1 ring-gray-500 ring-opacity-20 shadow-xl">
            {/* For some reason it keeps expanding when it's height == 100% */}
            <Monaco
                width="100%"
                height="99.85%"
                language={language}
                defaultLanguage="javascript"
                theme={"vs-dark"}
                value={value}
                defaultValue={code}
                options={{
                    showDeprecated: false,
                    codeLens: false,
                    fontFamily: "Cascadia Code",
                    fontLigatures: false,
                    fontSize: "11px",
                    minimap: {
                        enabled: false
                    },
                    tabSize: 4,
                    quickSuggestions: false,
                    suggest: {
                        preview: false,
                    },
                    wordBasedSuggestions: false,
                    acceptSuggestionOnCommitCharacter: false,
                    acceptSuggestionOnEnter: "off",
                    tabCompletion: "off",
                    parameterHints: {
                        enabled: false,
                    },
                    showUnused: false,
                    wordWrap: "on",

                }}
                onChange={(newValue) => {
                    setValue(newValue)
                    onChange(newValue)
                }}
                onMount={(editor, m) => {
                    import('app/styles/Galileo.tmTheme.json').then(theme => {
                        m.editor.defineTheme("galileo", theme)
                        m.editor.setTheme("galileo")
                    })
                }}
            />
        </div>
    )
}
