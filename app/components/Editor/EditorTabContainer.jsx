import supportedLanguages from "app/components/Editor/Activities/supportedLanguages"
import EditorCodeTab from "app/components/Editor/EditorTab"

export default function EditorTabContainer({
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
        console.log(activeTab)
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
            name: label
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
        <div className={"flex flex-row flex-nowrap w-full flex-shrink-0 pr-2 py-2 overflow-y-hidden overflow-x-auto " + className}>
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
                        canBeClosed={!(tab.name == "Preview" || tab.name == "Console" || tab.name == "Lesson Guide")}
                    />
                )
            })}
        </div>
    )
}
