import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sliderReducer from './slices/sliderSlice';
import publicReducer from './slices/publicSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    sliders: sliderReducer,
    //public reducer
    public: publicReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
