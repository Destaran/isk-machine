import { configureStore } from '@reduxjs/toolkit';
import marketReducer from './orders/ordersSlice';
import opportunitiesReducer from './orders/opportunitiesSlice';

export const store = configureStore({
  reducer: {
    market: marketReducer,
    opportunities: opportunitiesReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
