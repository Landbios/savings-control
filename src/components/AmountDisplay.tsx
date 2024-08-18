import { FormatCurrency } from "../utils"

type AmountDisplayProps = {
    label:string,
    amount:number
}

const AmountDisplay = ({label,amount}:AmountDisplayProps) => {
  return (
    <div>
        <p className="text-blue-600 text-2xl font-bold">
            {label}: {' '}
            <span className="text-black">{FormatCurrency(amount)}</span>
        </p>
    </div>
  )
}

export default AmountDisplay