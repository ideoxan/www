export default function PricingTableCell({ children, className }) {
    return <td className={"h-min w-full px-8 py-3 " + className}>{children}</td>
}
