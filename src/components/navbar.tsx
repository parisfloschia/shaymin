import { GoGraph } from 'react-icons/go';

export default function Navbar({toggle}){
  
  return <div className = 'flex justify-around my-5 items-center container mx-auto'>
    <h1 className = 'text-gray-800 font-bold italic text-2xl flex gap-2 items-center'><GoGraph className = 'size-8 text-blue-400'/>Expense Tracker</h1>
    <button className = 'p-2 border-2 border-black rounded-lg hover:bg-gray-800 hover:text-white' onClick = {() => toggle(true)}>Add transaction</button>
  </div>
}