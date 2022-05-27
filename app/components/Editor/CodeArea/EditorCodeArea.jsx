import { CssThree, Html5, Javascript, Json, Typescript } from "@icons-pack/react-simple-icons"
import Icon from "app/components/Icon"
import { useState, useEffect } from "react"
import EditorCodeTab from "app/components/Editor/CodeArea/EditorCodeTab"

export default function EditorCodeArea() {

    const supportedLanguages = {
        "null": {
            name: "New Tab",
            icon: null,
            color: "#fff",
            extension: null,
            mime: null
        },
        "html": {
            name: "Hypertext Markup Language",
            icon: Html5,
            color: "#E34F26",
            extension: "html",
            mime: "text/html",
        },
        "javascript": {
            name: "JavaScript",
            icon: Javascript,
            color: "#F7DF1E",
            extension: "js",
            mime: "application/javascript",
        },
        "typescript": {
            name: "TypeScript",
            icon: Typescript,
            color: "#3178C6",
            extension: "ts",
            mime: "application/typescript",
        },
        "json": {
            name: "JavaScript Object Notation",
            icon: Json,
            color: "#ffffff",
            extension: "json",
            mime: "application/json",
        },
        "css": {
            name: "Cascading Style Sheets",
            icon: CssThree,
            color: "#3178C6",
            extension: "css",
            mime: "text/css",
        },
    }

    const [openTabs, setOpenTabs] = useState([
        {
            name: "index.html"
        },
        {
            name: "index.js"
        },
        {
            name: "style.css"
        },
    ])
    const [activeTab, setActiveTab] = useState(0)

    function getSupportedLanguageFromExtension(ext) {
        for (let key in supportedLanguages) {
            if (supportedLanguages[key].extension === ext) {
                return supportedLanguages[key]
            }
        }
        return null
    }

    function closeTab(index) {
        if (openTabs.length === 1) {
            return
        }
        let newOpenTabs = [...openTabs]
        newOpenTabs.splice(index, 1)
        setOpenTabs(newOpenTabs)
    }

    function addTab(label) {
        let newOpenTabs = [...openTabs]
        newOpenTabs.push({
            name: label
        })
        setOpenTabs(newOpenTabs)
        setActiveTab(newOpenTabs.length - 1)
    }

    // This is a temp fix for the issue where the active tab can't be updated when a user closes
    // out of a tab
    // TODO: Fix this
    useEffect(() => {
        setActiveTab(0)
    }, [openTabs])

    return (
        <div className="flex flex-col h-full w-3/5" >
            {/* Editor Code Tabs */}
            <div className="flex flex-row w-full px-2 py-2" >
                {openTabs.map((tab, index) => {
                    // Get Extension
                    const ext = tab.name.split(".")[1]
                    // Get Language
                    const language = getSupportedLanguageFromExtension(ext)
                    // Render
                    return (
                        <EditorCodeTab
                            key={index}
                            active={index === activeTab}
                            FileTypeIconName={language.icon}
                            fileTypeIconColor={language.color}
                            label={tab.name}
                            onClick={() => {
                                setActiveTab(index)
                            }}
                            closeHandler={() => {
                                closeTab(index)
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}
