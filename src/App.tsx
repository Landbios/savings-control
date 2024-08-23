
import BudgetForm from "./components/BudgetForm"
import { useEffect, useMemo } from "react"
import { UseBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpensesModal"
import ExpenseList from "./components/ExpenseList"


function App() {
  
  
  const {state,dispatch} = UseBudget()
  const isValidBudget = useMemo(() => state.budget > 0,[state.budget])
  useEffect(() =>{
    if(localStorage.getItem('budget')){
      let localBudget = JSON.parse(localStorage.getItem('budget') || "")
      dispatch({type:'add-budget',payload:{budget:+localBudget}}) 
      if(localStorage.getItem('expenses')){
        
       let LocalExpenses = JSON.parse(localStorage.getItem('expenses') || "")
      
       dispatch({type:'load-expenses',payload:{expenses:LocalExpenses}})
        
      }

    }
    
  },[])

  return (
    <>
     <header className="bg-blue-600 py-8 max-h-72">
      <h1 className="uppercase text-center font-black text-4xl text-white">Expenses Planner</h1>

     </header>

     <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg  mt-10 p-10">
        {isValidBudget ? <BudgetTracker/>  : <BudgetForm/>}
     </div>

     {isValidBudget && (
      <main className="max-w-3xl mx-auto p-10">
        <ExpenseList/>
        <ExpenseModal/>
        
        </main>
      
     )}
     
    </>
  )
}

export default App
