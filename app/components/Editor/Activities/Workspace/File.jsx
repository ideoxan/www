import Icon from "app/components/Icon"
import languages from "app/components/Editor/Activities/supportedLanguages"

export default function File({
    file,
    openCodeTabs,
    setOpenCodeTabs,
    activeCodeTab,
    setActiveCodeTab,
    ...props
}) {
    let classes = ""
    const defaultClassName = "flex flex-row py-2 px-3 rounded-md w-full h-max cursor-pointer"

    function openTab() {
        // If the tab is already open, just set it to active
        let index = null
        // eslint-disable-next-line no-cond-assign
        if (
            openCodeTabs.length > 0 &&
            (index = openCodeTabs.findIndex(e => e.path == file.path)) != -1
        ) {
            setActiveCodeTab(index)
        } else {
            let newOpenTabs = [...openCodeTabs]
            newOpenTabs.push({
                name: file.path.split("/").pop(),
                path: file.path,
            })
            setOpenCodeTabs(newOpenTabs)
            setActiveCodeTab(newOpenTabs.length - 1)
        }
    }

    if (activeCodeTab >= 0 && openCodeTabs[activeCodeTab]?.path == file.path) {
        classes = defaultClassName + " bg-gray-900 opacity-100"
    } else {
        classes = defaultClassName + " opacity-70 hover:bg-gray-800 hover:opacity-90"
    }

    let langData = null
    for (let lang in languages) {
        if (languages[lang].mime == file.mime) {
            langData = languages[lang]
            break
        }
    }
    let FileIcon = null
    if (langData) {
        FileIcon = langData.icon
    }

    return (
        <li
            className={classes}
            onClick={() => {
                openTab()
            }}
        >
            {FileIcon ? (
                <FileIcon className="my-auto h-3 w-3 opacity-50" color={langData.color} />
            ) : (
                <Icon
                    name="File"
                    width={3}
                    height={3}
                    color="gray-50"
                    strokeThickness={2}
                    className="my-auto"
                />
            )}

            <p className="ml-2 truncate text-left font-sans text-xs font-medium text-gray-50">
                {file.path.split("/").pop()}
            </p>
        </li>
    )
}
