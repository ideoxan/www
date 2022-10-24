import Icon from "app/components/Icon"
import PricingTableCell from "app/components/Solutions/PricingTableCell"
import PricingTableRow from "app/components/Solutions/PricingTableRow"

export default function PricingTableHeader({ title, icon }) {
    return (
        <PricingTableRow header={true} bottomBorder={false} innerDivider={false}>
            <PricingTableCell className="col-span-4">
                <div className="flex flex-row">
                    <div className="mr-3 flex h-6 w-6 flex-shrink-0 flex-col rounded-md bg-gradient-to-tr from-primary to-secondary font-bold">
                        <Icon name={icon} className="m-auto text-gray-50" />
                    </div>
                    <span className="my-auto">{title}</span>
                </div>
            </PricingTableCell>
            <PricingTableCell className="col-span-4"></PricingTableCell>
            <PricingTableCell className="col-span-4"></PricingTableCell>
            <PricingTableCell className="col-span-4"></PricingTableCell>
        </PricingTableRow>
    )
}
