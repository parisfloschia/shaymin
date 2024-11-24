import { fetchTransactions } from '../state/slice.tsx';
import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTotalIncome, deleteTransaction } from '../state/slice.tsx';
import { GoTrash, GoPencil } from 'react-icons/go';
import Confirm from './confirm.tsx';

export default function Transactions({toggle, setEditId, setData}){
  
  const [discardId, setDiscardId] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector(state => state.transaction.transactions);
  
  const handleUpdate = (getInfo) => {
    setEditId(getInfo.id);
    setData(getInfo.newData);
  }
  
  useEffect(() => {
    dispatch(fetchTransactions());
  },[data])
  
  return <div className = 'w-11/12 '>
    <h1 className = 'w-full text-center font-bold italic'>Transaction History</h1>
    <br/>
    {
      data && data.length ? <div className = 'w-full grid grid-cols-5 p-2 items-center text-left text-xs rounded-s font-bold italic'>
        <p >Desc</p>
        <p >Amount</p>
        <p >Type</p>
        <p >Date</p>
      </div> : null
    }
    {
       data && data.length ? data?.map(transaction => {
        return <div key = {transaction?.id} className = ' w-full grid grid-cols-5 p-2 my-2 border-2 border-gray-500 items-center text-left text-xs rounded-lg'>
          {
            discardId !== null ? <Confirm discardId = {discardId} setDiscardId = {setDiscardId}/> : null
          }
          <p className = {`truncate ${transaction?.desc === 'No desc' ? 'opacity-30' : ''}`}>{transaction?.desc}</p>
          <p>$ {transaction?.amount}</p>
          <p>{transaction?.type?.charAt(0)?.toUpperCase() + transaction?.type?.substring(1)}</p>
          <p>{transaction?.created_at.split('T')[0]}</p>
          <div className = 'flex justify-around'>
          
          <button className = 'p-1 border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white' onClick = {() => handleUpdate({id:transaction?.id, newData: transaction})}><GoPencil/></button>
          <button className = 'p-1 border-2 border-gray-500 rounded-lg hover:bg-gray-500 hover:text-white' onClick = {() => setDiscardId(transaction?.id)}><GoTrash className = 'text-red-400'/></button>
          </div>
        </div>
      }) : <div className = 'w-full text-center my-5 opacity-50 text-xs'>No transactions were made. Try creating one.</div>
    }
  </div>
}