import Icon from "app/components/Icon"

export default function File({
    file, openCodeTabs, setOpenCodeTabs, activeCodeTab, setActiveCodeTab, ...props
}) {

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

    return (
        <li className="flex flex-row py-2 px-1 rounded-md hover:bg-gray-900 w-full h-max cursor-pointer opacity-80 hover:opacity-100" onClick={() => { openTab() }}>
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
