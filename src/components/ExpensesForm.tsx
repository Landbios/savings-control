import { categories } from "../data/Categorys"
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";

import { UseBudget } from "../hooks/useBudget";

const ExpensesForm = () => {


    const [expense,setExpense] = useState<DraftExpense>({amount:0, expenseName:'', category:'', date: new Date})

    const [error, setError] = useState('')
    const [prevAmount, setPrev] = useState(0)

    const {dispatch,state,remainingBudget} = UseBudget()

    useEffect(() =>{
        if(state.editingId) {
            const editingExpense = state.expenses.filter(expense => expense.id ==  state.editingId)[0]
            setExpense(editingExpense)
            setPrev(editingExpense.amount)
        }


    },[state.editingId])

    const handleDateChange = (value: Value) => {
        setExpense({...expense,date:value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //validate

        if(Object.values(expense).includes('')){
            setError('All fields are mandatory')
            return
        }
        if((expense.amount - prevAmount) > remainingBudget){
            setError('This expense is out of your budget.')
            
        }
        else{

            if(state.editingId){
                dispatch({type:'update-expense',payload:{expense:{id:state.editingId,...expense}}})
            }
            else{
                dispatch({type:'add-expense', payload:{expense}})
                setExpense({amount:0, expenseName:'', category:'', date: new Date})
                setPrev(0)

            }
         
        }
    }
  return (
    <form action="" className='space-y-5' onSubmit={e => handleSubmit(e)}>
        <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
            {state.editingId ? 'Editing Expense' : 'New Expense'}
        </legend>
        {error && <ErrorMessage> {error}</ErrorMessage>}
        <div className='flex flex-col gap-2'>
            <label htmlFor="expenseName" className='text-xl'>Expense Name</label>
            <input onChange={(e) => {setExpense({...expense,expenseName:e.target.value})} } value={expense.expenseName} type="text" id='expenseName' placeholder='add the name of the expense' className='bg-slate-100 p-2' name='expenseName' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="expenseAmount" className='text-xl'>Expense Amount</label>
            <input value={expense.amount} onChange={(e) => {setExpense({...expense,amount:+e.target.value})} } type="number" id='expenseAmount' placeholder='add the name of the expense' className='bg-slate-100 p-2' name='expenseAmount' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="expenseCategory" className='text-xl'>Expense Category</label>
            <select onChange={(e) => {setExpense({...expense,category:e.target.value})} } value={expense.category} id='expenseCategory' className='bg-slate-100 p-2' name='expenseCategory' >
            <option value=" ">--Select Category--</option>
            {categories.map((category) => {
                return(<option value={category.name} id={category.id} >{category.name}</option>)
            })}
            
            </select>
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="expenseAmount" className='text-xl'>Expenses Date</label>
            <DatePicker value={expense.date} onChange={handleDateChange} className='bg-slate-100 p-2  border-0'/>
        </div>

        <input type="submit" value={state.editingId ? 'Edit Expense' : 'Save Expense'}  className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"/>
    </form>
  )
}

export default ExpensesForm