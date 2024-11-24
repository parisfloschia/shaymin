import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Summary from './components/summary.tsx';
import PieChart from './components/chart.tsx';
import Navbar from './components/navbar.tsx';
import Ui from './components/ui.tsx';
import Transactions from './components/transactions';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState<any>(null);
  const [data, setData] = useState({});
  
  return <div className = 'flex flex-col items-center gap-5'>
<Navbar toggle = {setIsOpen}/>
<div className = 'flex flex-col gap-10 items-center md:flex-row'>
<Summary/>
<PieChart/>
</div>
<Transactions setData = {setData} toggle = {setIsOpen} setEditId = {setEditId}/>
{
  isOpen || editId ? <Ui toggle = {setIsOpen} data = {data} setData = {setData} editId = {editId} setEditId = {setEditId} /> : null
}
  </div>
}

export default App
