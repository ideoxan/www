import supportedLanguages from "app/components/Editor/Activities/supportedLanguages"
import { useEffect } from "react"
import EditorCodeTab from "app/components/Editor/EditorTab"

export default function EditorTabContainer({
    openTabs,
    setOpenTabs,
    activeTab,
    setActiveTab
}) {

    function getSupportedLanguageFromExtension(ext) {
        for (let key in supportedLanguages) {
            if (supportedLanguages[key].extension === ext) {
                return supportedLanguages[key]
            }
        }
        return supportedLanguages["null"]
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
    }, [setActiveTab, openTabs])


    return (
        <div className="flex flex-row w-full px-2 py-2 overflow-x-auto" >
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
                        canBeClosed={!(tab.name == "Viewport" || tab.name == "Console" || tab.name == "Lesson Guide")}
                    />
                )
            })}
        </div>
    )
}
