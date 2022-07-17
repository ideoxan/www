import Icon from "app/components/Icon"

export default function File({
    file, openCodeTabs, setOpenCodeTabs, activeCodeTab, setActiveCodeTab, ...props
}) {

    let classes = ""
    const defaultClassName = "flex flex-row py-2 px-1 rounded-md w-full h-max cursor-pointer"

    function openTab() {
        // If the tab is already open, just set it to active
        let index = null
        // eslint-disable-next-line no-cond-assign
        if ((index = openCodeTabs.findIndex(e => e.path == file.path)) != -1) {
            setActiveCodeTab(index)
        } else {
            let newOpenTabs = [...openCodeTabs]
            newOpenTabs.push({
                name: file.path.split('/').pop(),
                path: file.path,
            })
            setOpenCodeTabs(newOpenTabs)
            setActiveCodeTab(newOpenTabs.length - 1)
        }
    }

    if (openCodeTabs[activeCodeTab].path == file.path) {
        classes = defaultClassName + " bg-gray-900 opacity-100"
    } else {
        classes = defaultClassName + " opacity-70 hover:bg-gray-800 hover:opacity-90"
    }

    return (
        <li className={classes} onClick={() => { openTab() }}>
            <Icon
                name="File"
                width={3}
                height={3}
                color="gray-50"
                strokeThickness={2}
                className="my-auto"
            />
            <p className="font-sans font-medium text-xs text-left text-gray-50 ml-2 truncate">{file.path.split('/').pop()}</p>
        </li>
    )
}
