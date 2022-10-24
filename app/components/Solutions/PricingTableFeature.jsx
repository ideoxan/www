import PricingTableCell from "app/components/Solutions/PricingTableCell"
import Icon from "app/components/Icon"

export default function PricingTableFeature({ icon, className, iconColor = "text-gray-50" }) {
    return (
        <PricingTableCell className={className}>
            <Icon name={icon} className={"mr-2 " + iconColor} />
        </PricingTableCell>
    )
}
