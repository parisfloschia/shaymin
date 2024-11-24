import { GoXCircle, GoAlert} from 'react-icons/go'
import { useDispatch } from 'react-redux';
import { deleteTransaction, fetchTransactions }from '../state/slice';

export default function Confirm({discardId, setDiscardId}){
  
  const dispatch = useDispatch();
  
  const handleDiscard = () => {
    dispatch(deleteTransaction(discardId));
    dispatch(fetchTransactions());
    setDiscardId(null);
  }
 
  return <div className = 'w-[100vw] h-[100vh] bg-[#00000070] absolute top-0 left-0 flex justify-center items-center'>
    <div className = 'bg-white text-black p-5 rounded-lg flex flex-col items-center gap-5'>
      <p onClick = {() => setDiscardId(null)}className = 'w-full flex justify-end'><GoXCircle className = 'size-6 absolute text-red-400'/></p>
      <p className = 'opacity-50 text-xs'>Delete transaction</p>
      <div className = 'flex flex-col  items-center'>
      <h1 className = 'text-lg font-bold text-red-700 flex gap-1 items-center'><GoAlert className = 'size-8'/>This action cannot be undone</h1>
      <p className = 'opacity-50 text-xs'>This will remove the corresponding data</p>
      </div>
      <button className = 'p-2 rounded-lg border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-bold' onClick = {handleDiscard}>Confirm</button>
    </div>
  </div>
}