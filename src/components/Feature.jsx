
import { RiBankCardFill, RiComputerLine, RiMoneyDollarCircleFill } from "react-icons/ri";


function Feature(props) {
    const {icon, title, description} = props

    let iconTag
    const iconClass = "text-3xl text-third"

    switch (icon) {
        case "card":
            iconTag = <RiBankCardFill className={iconClass} />
            break;
        case "computer":
            iconTag = <RiComputerLine className={iconClass} />
            break;
        case "money":
            iconTag = <RiMoneyDollarCircleFill className={iconClass} />
            break;
        default:
            break;
    }

    return (
        <figure className="flex flex-col w-full rounded-xl bg-black bg-opacity-5 p-8 gap-3 md:w-[25vw] lg:p-10">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                {iconTag}
            </div>
            <h3 className="font-semibold text-2xl mt-3">{title}</h3>
            <p className="text-xl font-medium opacity-50">{description}</p>
        </figure>
    )
}

export default Feature
