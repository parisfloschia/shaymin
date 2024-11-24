import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { getTotalIncome, getTotalExpense } from '../state/slice.tsx';

export default function Summary(){
  const dispatch = useDispatch();
  const income = useSelector(state => state.transaction.incomeSum);
  const expense = useSelector(state => state.transaction.expenseSum);
  const data = useSelector(state => state.transaction.transactions);
  
  
  useEffect(() => {
    dispatch(getTotalIncome());
    dispatch(getTotalExpense());
  },[data])
 
  
  return <div className = 'py-3 px-10 shadow-lg rounded-lg flex flex-col items-center gap-5 justify-center text-center container mx-auto size-56 '>
    <p className = 'text-xs text-center w-full opacity-50'>Total Summary: </p>
    <div>
    <p className = 'font-bold italic'>${income}</p>
    <h1>Income</h1>
    </div>
    <div>
    <p className = 'font-bold italic'>${expense}</p>
    <h1>Expenses</h1>
    </div>
  </div>
}