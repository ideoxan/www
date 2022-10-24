import PricingTableCell from "app/components/Solutions/PricingTableCell"

export default function PricingTableRowHeader({ children, className }) {
    return (
        <PricingTableCell className={"font-semibold text-opacity-80 " + className}>
            {children}
        </PricingTableCell>
    )
}
