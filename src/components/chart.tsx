import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';

export default function PieChart(){
  
  const dispatch = useDispatch();
  const income = useSelector(state => state.transaction.incomeSum);
  const expense = useSelector(state => state.transaction.expenseSum);
  const data = useSelector(state => state.transaction.transactions);
  
  interface opt{
    labels:string[],
    colors:string[],
    series:number[]
  }
  
  const options : opt = {
    labels: ['Income','Expenses'],
    colors:['hsl(201, 94.4%, 86.1%)','hsl(0, 90.6%, 70.8%)'],
    series: [income || 0.00001, expense || 0.00001]
}
  
  return <div className = 'flex items-center justify-center container mx-auto w-full'>
    <Chart className = 'size-84' type = 'pie' options = {options} series = {options?.series} />
  </div>
}