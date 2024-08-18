import { categories } from "../data/Categorys"
const ExpensesForm = () => {
  return (
    <form action="" className='space-y-5'>
        <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
            New Expense
        </legend>
        <div className='flex flex-col gap-2'>
            <label htmlFor="expenseName" className='text-xl'>Expense Name</label>
            <input type="text" id='expenseName' placeholder='add the name of the expense' className='bg-slate-100 p-2' name='expenseName' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="expenseAmount" className='text-xl'>Expense Amount</label>
            <input type="number" id='expenseAmount' placeholder='add the name of the expense' className='bg-slate-100 p-2' name='expenseAmount' />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="expenseCategory" className='text-xl'>Expense Category</label>
            <select id='expenseCategory' className='bg-slate-100 p-2' name='expenseCategory' >
            <option value=" ">--Select Category--</option>
            {categories.map((category) => {
                return(<option value={category.name} id={category.id} >{category.name}</option>)
            })}
            
            </select>
        </div>

        <input type="submit" value="Save Expense"  className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"/>
    </form>
  )
}

export default ExpensesForm