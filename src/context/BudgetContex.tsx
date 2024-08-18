import { createContext, useReducer, Dispatch, ReactNode } from "react"
import { BudgetReducer,BudgetState,initialState,BudgetActions } from "../reducers/budget-reducer"


type BudegtContextProps ={
    state:BudgetState,
    dispatch:Dispatch<BudgetActions>
}

type ChildrenProps ={
    children:ReactNode
}

export const BudgetContext = createContext({} as BudegtContextProps)

export const BudgetProvider = ({children} : ChildrenProps) =>{
    const [state,dispatch] = useReducer(BudgetReducer,initialState)
    return(
        <BudgetContext.Provider value={{
            state,dispatch
        }}>
            {children}
        </BudgetContext.Provider>
    )
}