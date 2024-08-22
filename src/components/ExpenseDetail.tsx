import { useMemo } from 'react'
import { Expense } from '../types'
import { UseBudget } from '../hooks/useBudget'
import { LeadingActions, SwipeableListItem, SwipeableList, TrailingActions, SwipeAction } from 'react-swipeable-list'
import AmountDisplay from './AmountDisplay'
import { categories } from '../data/Categorys'
import { FormatDate } from '../utils'
import 'react-swipeable-list/dist/styles.css'
type ExpenseDetailProps = {
  expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const {dispatch} = UseBudget();
  const categoryInfor = useMemo(() => categories.filter((cate) => cate.name === expense.category)[0], [expense])

  const leadingActions = () =>(
    <LeadingActions>
      <SwipeAction onClick={() => {dispatch({type:'get-expense-by-id',payload:{id:expense.id}})}}>
        Update
      </SwipeAction>

    </LeadingActions>
  )

  
  const trailingActions = () =>(
    <TrailingActions>
      <SwipeAction onClick={() => {dispatch({type:'remove-expense',payload:{id:expense.id}})}} destructive={true}>
        Delete
        
      </SwipeAction>

    </TrailingActions>
  )
  return (
    <SwipeableList>
      <SwipeableListItem maxSwipe={30} leadingActions={leadingActions()} trailingActions={trailingActions()} >
        <div className='bg-white shadow-lg my-2 border-gray-200 rounded-md p-10 w-full border-10 flex gap-5 items-center'>
          <div>
            <img src={`/icono_${categoryInfor.icon}.svg`} alt='expense icon ' className='w-20' />

          </div>
          <div className='flex-1 space-y-2'>
            <p className='text-sm font-bold uppercase text-slate-500'> {categoryInfor.name}</p>
            <p>{expense.expenseName}</p>
            <p className='text-slate-600 text-sm'> {FormatDate(expense.date?.toString()!)}</p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>

      </SwipeableListItem>


    </SwipeableList>

  )
}
