import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient.ts';


const initialState = {
  loading: false,
  transactions: [],
  incomeSum: 0,
  expenseSum: 0
}

export const fetchTransactions = createAsyncThunk('fetchTransactions', async() => {
   const  data  = await supabase
  .from('transactions')
  .select('*');
  return data;
})

export const updateTransaction = createAsyncThunk('updateTransaction', async(getInfo) => {
   const data  = await supabase
  .from('transactions')
  .update(getInfo.newData)
  .eq('id', getInfo.id);
  return data;
})

export const deleteTransaction = createAsyncThunk('deleteTransaction', async(getId) => {
   const data  = await supabase
  .from('transactions')
  .delete()
  .eq('id', getId);
  return data;
})

export const addTransaction = createAsyncThunk('addTransaction', async(getData) => {
   const data  = await supabase
  .from('transactions')
  .insert(getData);
  return data;
 
})

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers:{
    getTotalIncome: (state) => {
     const income = state.transactions.filter(transac => transac.type === "income");
      let sum = 0;
    for(let i = 0; i < income.length; i++){
      sum += income[i].amount;
    }
    state.incomeSum = sum;
    },
    getTotalExpense: (state) => {
     const expense = state.transactions.filter(transac => transac.type === "expense");
      let sum = 0;
    for(let i = 0; i < expense.length; i++){
      sum += expense[i].amount;
    }
    state.expenseSum = sum;
    }
  }, extraReducers: (builder) => {
    //FETCH TRANSACTIONS
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false; 
      state.transactions = action.payload.data
    })
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.loading = false;
    })
  }
})

export default transactionSlice.reducer;
export const { getTotalIncome, getTotalExpense } = transactionSlice.actions;
