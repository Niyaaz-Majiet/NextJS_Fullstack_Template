import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: "counter",
  storage: storage,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
      increment: (state) => state + 1,
      decrement: (state) => state - 1,
    },
  });

  
  export const { increment, decrement } = counterSlice.actions;

  export const getCount = (state: RootState) => state.counter;

  export default persistReducer(persistConfig, counterSlice.reducer);