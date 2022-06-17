import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import pizzaSlice from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizza: pizzaSlice,
  },
});

//! тип для useState
export type RootState = ReturnType<typeof store.getState> 

//! тип для dispatch
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()