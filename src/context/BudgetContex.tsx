import { createContext, useReducer, Dispatch, ReactNode } from "react"
import { BudgetReducer,BudgetState,initialState,BudgetActions } from "../reducers/budget-reducer"
import { useMemo } from "react"

type BudegtContextProps ={
    state:BudgetState,
    dispatch:Dispatch<BudgetActions>,
    totalExpenses:number,
    remainingBudget:number
}

type ChildrenProps ={
    children:ReactNode
}

export const BudgetContext = createContext({} as BudegtContextProps)

export const BudgetProvider = ({children} : ChildrenProps) =>{
    const [state,dispatch] = useReducer(BudgetReducer,initialState)
    const totalExpenses = useMemo(() => state.expenses.reduce((total,expense) => expense.amount + total,0 ),[state.expenses])

    const remainingBudget =   state.budget - totalExpenses
    return(
        <BudgetContext.Provider value={{
            state,dispatch,totalExpenses,remainingBudget
        }}>
            {children}
        </BudgetContext.Provider>
    )
}