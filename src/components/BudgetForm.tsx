import { useMemo, useState } from "react"
 import { UseBudget } from "../hooks/useBudget"
const BudgetForm = () => {
  const {dispatch} = UseBudget()
  const [budget,setBudget] = useState(0)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setBudget(e.target.valueAsNumber)
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    dispatch({type:'add-budget',payload:{budget}})
    localStorage.setItem('budget', JSON.stringify(budget))
  }


  //Validacion de presupuesto con useMemo
  const isValid = useMemo(() => {return isNaN(budget) || budget ==0},[budget])
  return (
    <form action="" onSubmit={(e) => handleSubmit(e)} className="space-y-5">

      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center"></label>
        <input type="number" value={budget} onChange={(e) => handleChange(e)} name="budget" placeholder="define your budget" className="bg-white border border-gray-200 p-2" id="spends" />
        <input type="submit" value="Define Budget" className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40 disabled:cursor-default" disabled={isValid}/>
      </div>
    </form>
  )
}

export default BudgetForm