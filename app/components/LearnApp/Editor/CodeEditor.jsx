import Monaco from "@monaco-editor/react"
import { useState, useEffect } from "react"
import { getType } from "mime"
import supportedLanguages from "app/components/LearnApp/Editor/supportedLanguages"

export default function CodeEditor({
    onChange,
    openCodeTabs,
    activeCodeTab,
    fs,
    lang,
    setLang,
    code,
    editorRef,
    monacoRef,
    theme,
    hidden,
    ...props
}) {
    const [value, setValue] = useState(code || "")

    useEffect(() => {
        ;(async () => {
            let tab = openCodeTabs[activeCodeTab]
            if (!tab) return
            let mime = getType(tab.path)
            setValue(await fs.readFile({ filePath: tab.path }))
            for (let l in supportedLanguages) {
                if (supportedLanguages[l].mime == mime) {
                    setLang(l)
                    break
                }
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    insertSpaces: true,
                    detectIndentation: false,
                }}
                onChange={(newValue, event) => {
                    setValue(newValue)
                    onChange(newValue)
                }}
                onMount={(editor, m) => {
                    editorRef.current = editor
                    monacoRef.current = m
                    import("app/styles/Galileo.tmTheme.json").then(theme => {
                        m.editor.defineTheme("galileo", theme)
                        m.editor.setTheme("galileo")
                    })
                }}
            />
        </div>
    )
}
