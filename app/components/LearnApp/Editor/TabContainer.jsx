import Icon from "app/components/Icon"
import supportedLanguages from "app/components/LearnApp/Editor/supportedLanguages"

export default function TabContainer({
    openTabs,
    setOpenTabs,
    activeTab,
    setActiveTab,
    className,
    ...props
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
        let newOpenTabs = [...openTabs]
        newOpenTabs.splice(index, 1)
        setOpenTabs(newOpenTabs)
        // !!!: [BUG] If the last tab is active and gets closed, the active tab will be stuck at
        // !!!: the last tab. Also, it shifts the active tab over by one if a tab to the left is
        // !!!: closed. NEEDSFIX
        //console.log(activeTab)
        if (newOpenTabs.length == 0) {
            //console.log("No tabs left")
            setActiveTab(-1)
        } else if (activeTab == 0) {
            //console.log("Active tab is 0")
            setActiveTab(0)
        } else if (activeTab < index) {
            //console.log("Active tab is unaffected")
            setActiveTab(activeTab)
        } else if (activeTab >= index) {
            //console.log("Active tab is shifted down by 1")
            setActiveTab(activeTab - 1)
        } else if (activeTab == openTabs.length) {
            //console.log("Active tab is shifted down by 1")
            setActiveTab(activeTab - 1)
        }
    }

    function addTab(label) {
        let newOpenTabs = [...openTabs]
        newOpenTabs.push({
            name: label,
        })
        setOpenTabs(newOpenTabs)
        setActiveTab(newOpenTabs.length - 1)
    }

    // This is a temp fix for the issue where the active tab can't be updated when a user closes
    // out of a tab
    // TODO: Fix this
    /*
    useEffect(() => {
        setActiveTab(0)
    }, [setActiveTab, openTabs]) */

    return (
        <div
            className={
                "flex h-min w-full flex-shrink-0 flex-grow-0 flex-row flex-nowrap overflow-x-auto overflow-y-hidden py-2 pr-2 " +
                className
            }>
            {openTabs.map((tab, index) => {
                // Get Extension
                const ext = tab.name.split(".")[1]
                // Get Language
                const language = getSupportedLanguageFromExtension(ext)
                // Icon
                let fallbackIconName = null
                if (!language?.icon) {
                    switch (tab.name) {
                        case "Preview":
                            fallbackIconName = "Monitor"
                            break
                        case "Console":
                            fallbackIconName = "Terminal"
                            break
                        case "Lesson Guide":
                            fallbackIconName = "FileText"
                            break
                        default:
                            fallbackIconName = "File"
                    }
                }
                // Render
                return (
                    <div
                        key={index}
                        className={
                            "mr-2 flex h-max w-48 flex-shrink-0 flex-grow-0 cursor-pointer flex-row rounded-lg border-2 border-primary bg-gray-700 py-2 pl-4 pr-2 " +
                            (index == activeTab
                                ? "border-opacity-100 bg-opacity-100 opacity-100"
                                : "border-opacity-0 bg-opacity-0 opacity-50")
                        }
                        onClick={() => {
                            setActiveTab(index)
                        }}>
                        {language?.icon ? (
                            <language.icon
                                className="my-auto h-3 w-3"
                                color={language.color || "#fff"}
                            />
                        ) : (
                            <Icon
                                name={fallbackIconName}
                                width={3}
                                height={3}
                                className="my-auto text-gray-50"
                            />
                        )}

                        <p className="ml-3 text-left font-sans text-xs font-medium text-gray-50">
                            {tab.name || "New Tab"}
                        </p>

                        {!(
                            tab.name == "Preview" ||
                            tab.name == "Console" ||
                            tab.name == "Lesson Guide"
                        ) && (
                            <button
                                className="my-auto ml-auto text-gray-50 opacity-50 hover:opacity-100"
                                onClick={() => {
                                    closeTab(index)
                                }}>
                                <Icon name="X" width={3} height={3} className="ml-auto" />
                            </button>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
