import Icon from "app/components/Icon"

export default function File({ file, ...props }) {
    return (
        <li className="flex flex-row py-2 px-1 rounded-md hover:bg-gray-900 w-full h-max cursor-pointer opacity-80 hover:opacity-100">
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
