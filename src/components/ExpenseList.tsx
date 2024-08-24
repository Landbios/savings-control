import { useMemo } from "react";
import { UseBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList ()  {

    const {state} = UseBudget();
   
    const filteredExpense = state.currentCategory ? state.expenses.filter(expense => expense.category == state.currentCategory) : state.expenses
    const isEmpty = useMemo(() => filteredExpense.length === 0, [filteredExpense])
    
  return (
    <div className="mt-10">

        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">There arent any expenses</p> : (<>
        
        <p className="text-gray-600 text-2xl  font-bold my-5">List of Expenses</p>
        {filteredExpense.map(expense => (

           <ExpenseDetail key={expense.id} expense={expense}/>
        ))}
        
        
        </>)}
    </div>
  )
}

