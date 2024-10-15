import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sliderReducer from './slices/sliderSlice';
import publicReducer from './slices/publicSlice';
import blogNewsReducer from './slices/blogNewsSlice';
import eventsReducers from './slices/eventsSlice';
import wishersReducers from './slices/wishersSlice';
import doctorSliderReducers from './slices/doctorSliderSlice';
import galleryReducers from './slices/gallerySlice';
import settingReducers from './slices/settingSlice';
import missionVisionReducers from './slices/missionVisionSlice';
import whoWeAreReducers from './slices/whoWeAreSlice';
import btsHistoryReducers from './slices/btsHistorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sliders: sliderReducer,
    blogNews: blogNewsReducer,
    events: eventsReducers,
    wishers: wishersReducers,
    doctorSliders: doctorSliderReducers,
    galleries: galleryReducers,
    settings: settingReducers,
    missionVision: missionVisionReducers,
    whoWeAres: whoWeAreReducers,
    btsHistory: btsHistoryReducers,
    //public reducer
    public: publicReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
