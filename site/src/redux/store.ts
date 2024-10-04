import { configureStore } from '@reduxjs/toolkit';
import marketReducer from './orders/ordersSlice';

export const store = configureStore({
  reducer: {
    market: marketReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
