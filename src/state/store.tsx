import { configureStore } from '@reduxjs/toolkit';
import TransactionReducer from './slice.tsx';

const store = configureStore({
  reducer:{
    transaction: TransactionReducer
  }
})

export default store;