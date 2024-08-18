import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContex"


export const UseBudget = () =>{
    const contex = useContext(BudgetContext)
    if(!contex) {
        throw new Error("useBudget must be used withing an BudgetContex");
        
    }
    return contex
}