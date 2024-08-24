import AmountDisplay from "./AmountDisplay"
import { UseBudget } from "../hooks/useBudget"
import {CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'

const BudgetTracker = () => {
  const {state,totalExpenses,remainingBudget, dispatch} = UseBudget()
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='flex justify-center'>
            <CircularProgressbar value={percentage} text={`${percentage}% expended`} styles={buildStyles({pathColor: percentage == 100 ? '#ff0000' : '#3b82f6', trailColor:'#f5f5f5',textSize:8, textColor:'#3b82f6'})}/>
        </div>
        <div className='flex flex-col  justify-center items-left gap-8'>
            <button type='button' onClick={() => dispatch({type:'reset-app'})} className='bg-pink-700 text-white py-2 font-bold rounded-lg w-full uppercase'>Resetear App</button>
            <AmountDisplay label={"Presupuesto"} amount={state.budget}/>
            <AmountDisplay label={"Disponible"} amount={remainingBudget}/>
            <AmountDisplay label={"Gastado"} amount={totalExpenses}/>
        </div>
    </div>
  )
}

export default BudgetTracker