import Monaco from "@monaco-editor/react"
import { useState, useEffect } from "react"
import { getType } from "mime"
import supportedLanguages from "app/components/Editor/Activities/supportedLanguages"

export default function EditorCodeArea({
    onChange,
    openCodeTabs,
    activeCodeTab,
    fs,
    language,
    code,
    theme,
    hidden,
    ...props
}) {
    const [value, setValue] = useState(code || "")
    const [lang, setLang] = useState(language || "javascript")

    useEffect(() => {
        ;(async () => {
            let tab = openCodeTabs[activeCodeTab]
            let mime = getType(tab.path)
            setValue(await fs.readFile({ filePath: tab.path }))
            for (let l in supportedLanguages) {
                if (supportedLanguages[l].mime == mime) {
                    setLang(l)
                    break
                }
            }
        })()
    }, [openCodeTabs, activeCodeTab, fs])

    return (
        <div
            className={
                "h-full max-h-full w-full flex-col overflow-hidden rounded-lg shadow-xl ring-1 ring-gray-500 ring-opacity-20 " +
                (hidden ? "hidden" : "flex")
            }
            {...props}>
            {/* For some reason it keeps expanding when it's height == 100% */}
            <Monaco
                width="100%"
                height="99.85%"
                language={lang}
                theme={"vs-dark"}
                value={value}
                options={{
                    showDeprecated: false,
                    codeLens: false,
                    fontFamily: "Cascadia Code",
                    fontLigatures: false,
                    fontSize: "11px",
                    minimap: {
                        enabled: false,
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
                onChange={newValue => {
                    setValue(newValue)
                    onChange(newValue)
                }}
                onMount={(editor, m) => {
                    import("app/styles/Galileo.tmTheme.json").then(theme => {
                        m.editor.defineTheme("galileo", theme)
                        m.editor.setTheme("galileo")
                    })
                }}
            />
        </div>
    )
}
