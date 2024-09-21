import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sliderReducer from './slices/sliderSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    sliders: sliderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
