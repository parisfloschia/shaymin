import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction, fetchTransactions, updateTransaction } from '../state/slice'

export default function Ui({toggle, setData, data, editId , setEditId}){
  
  interface layout{
    desc: string,
    amount: number,
    type: string
  }
  
  const [confirm, setConfirm] = useState<boolean>(false);
  const [format, setFormat] = useState<layout>({
    desc: '',
    amount: 0,
    type:'default'
  })
  
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    let layout = {...format};
    layout = {
      ...layout, [e.target.name] : e.target.value
    }
    setFormat(layout);
  }
  
  useEffect(() => {
    if(!data){
      return;
    }
   setFormat({
     desc: data?.desc,
     amount: data?.amount,
     type: data?.type
   })
  },[data])
  
  const handleCancel = () => {
    toggle(false);
    setEditId(null);
    setData({});
  }
  
  const handleSubmit = () => {
    if(!format.amount || format.amount == 0){
      return;
    }
    const layout = {
      desc: format?.desc || 'No desc',
      amount: format?.amount,
      type: format?.type || 'income'
    }
    handleCancel()
    dispatch(addTransaction(layout));
    setFormat({
      desc: '',
    amount: 0,
    type:'default'
    })
    dispatch(fetchTransactions())
  }
  
  const handleUpdate = () => {
    dispatch(updateTransaction({id: editId, newData: format}));
    handleCancel();
    dispatch(fetchTransactions());
  }
  
  return <div className = 'w-[100vw] h-[100vh] flex items-center justify-center bg-[#00000070] absolute'><div className = 'flex flex-col justify-center items-center gap-5 w-8/12 p-4 shadow-lg rounded-lg my-5 bg-white overflow-hidden absolute top-40'>
    <p className = 'text-xs opacity-50'>{
      editId && data ? 'Update transaction' : 'Add transaction'
    }</p>
    <textarea type = 'text' className = 'p-2 w-11/12 rounded-lg shadow-lg h-24' placeholder = 'Description' name = 'desc' value = {format.desc} onChange = {handleChange}/>
    <input className = 'p-2 w-11/12 rounded-lg shadow-lg' placeholder = 'Amount' name = 'amount' value = {format?.amount} type = 'number' onChange = {handleChange}/>
    <p className = 'opacity-50 text-xs h-1'>
    {
      format?.amount < 1 || isNaN(format?.amount) ? 'Type a valid amount' : ''}
    </p>
    <div className = 'flex gap-5'>
      <div className = 'flex items-center gap-2'>
      <input onChange = {handleChange} type = 'radio' name = 'type' value = 'income' checked = {
        !editId ? true : data?.type === 'income' ? true : null
      }/>
      <label for = 'income'>Income</label>
      </div>
      <div className = 'flex items-center gap-2'>
      <input onChange = {handleChange} type = 'radio' name = 'type' value = 'expense' checked = { data?.type === 'expense' ? true : null }/>
      <label for = 'expense'>Expense</label>
      </div>
    </div>
    <div className = 'w-full flex justify-end gap-5'>
      <button onClick = {handleCancel} className = 'p-2 border-2 border-black rounded-lg hover:bg-gray-800 hover:text-white'>Cancel</button>
      <button onClick = {editId && data ? handleUpdate : handleSubmit} className = 'p-2 text-white bg-gray-800 border-2 border-black rounded-lg hover:bg-white hover:text-black font-bold'>Proceed</button>
    </div>
  </div>
  </div>
}