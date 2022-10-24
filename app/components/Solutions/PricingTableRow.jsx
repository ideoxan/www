export default function PricingTableRow({
    children,
    className,
    header = false,
    bottomBorder = true,
    innerDivider = true,
}) {
    let h = header ? "bg-gray-700 text-opacity-100 " : "bg-transparent text-opacity-60 "
    let b = bottomBorder ? "border-b-1 border-gray-500 border-opacity-50 " : "border-b-0 "
    let d = innerDivider ? "divide-x-1 divide-gray-500 divide-opacity-50 " : "divide-x-0 "
    return (
        <tr
            className={
                "w-full text-left text-xs font-medium text-gray-50 " + h + b + d + className
            }>
            {children}
        </tr>
    )
}
