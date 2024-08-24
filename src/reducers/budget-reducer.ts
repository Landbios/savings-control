import { Category, DraftExpense, Expense } from "../types"
import {v4 as uuidv4} from 'uuid'

export type BudgetActions =
    {type:'add-budget', payload:{budget:number}} | 
    {type:'show-modal'} |
    {type:'hide-modal'} |
    {type:'add-expense', payload:{expense:DraftExpense}} |
    {type: 'remove-expense', payload:{id:Expense['id']}} |
    {type: 'get-expense-by-id', payload:{id:Expense['id']}} |
    {type: 'update-expense', payload:{expense:Expense}} |
    {type: 'load-expenses', payload:{expenses:Expense[]}} |
    {type: 'reset-app'} |
    {type: 'filter-category', payload:{id:Category['id']}}



export type BudgetState = {
    budget:number
    modal:boolean
    expenses:Expense[]
    editingId:Expense['id'],
    currentCategory:Category['id']
}

const initialBudget = () => {
   
        let localBudget = localStorage.getItem('budget') 
    return localBudget ? +localBudget:0
}



export const initialState: BudgetState = {
    budget:initialBudget(),
    modal:false,
    expenses:[],
    editingId:'',
    currentCategory:''
    
}

const createExpense = (drafExpense:DraftExpense):Expense =>{
    return{
        ...drafExpense,id:uuidv4()
    }
}


export const BudgetReducer = (state:BudgetState = initialState,action:BudgetActions) => {
    
    if(action.type == 'add-budget'){
        return {...state,budget:action.payload.budget}
    }
    if(action.type == 'show-modal'){
        return{...state,modal:true}
    }
    if(action.type == 'hide-modal'){
        return{...state,modal:false,editingId:''}
    }
    if(action.type == 'add-expense'){
        
        const expense = createExpense(action.payload.expense)
       
        localStorage.setItem('expenses', JSON.stringify([...state.expenses,expense]))
        return{...state, expenses:[...state.expenses, expense],modal:false}
    }
    if(action.type == 'remove-expense'){
        localStorage.setItem('expenses', JSON.stringify([...state.expenses.filter(expense => expense.id !== action.payload.id)]))
        return{...state,expenses:state.expenses.filter(expense => expense.id !== action.payload.id)}
    }
    if(action.type == 'get-expense-by-id'){
        return{...state,editingId:action.payload.id,modal:true}
    }
    if( action.type == 'update-expense'){
        localStorage.setItem('expenses', JSON.stringify([...state.expenses.map(expense => expense.id == action.payload.expense.id ? action.payload.expense : expense)]))
        return{...state,expenses:state.expenses.map(expense => expense.id == action.payload.expense.id ? action.payload.expense : expense),modal:false,editingId:''}
    }
    if(action.type == 'load-expenses'){
        return{...state,expenses:action.payload.expenses}
    }

    if(action.type == 'reset-app'){
        localStorage.removeItem('budget');
        localStorage.removeItem('expenses');
        return{...state,expenses:[],budget:0,editingId:''}
    }
    
    if(action.type == 'filter-category'){
        return{...state, currentCategory:action.payload.id}
    }
    return state

}
