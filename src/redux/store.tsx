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
import ourProjectReducers from './slices/ourProjectSlice';
import noticesReducers from './slices/noticesSlice';
import pagesReducers from './slices/pagesSlice';
import tifSliderReducers from './slices/tifSliderSlice';
import tifAttachmentPageReducers from './slices/pageAttachmentSlice';
import yearsReducers from './slices/yearsSlice';
import publicationReducers from './slices/publicationsSlice';
import commonReducers from './slices/commonSlice';
import bloodDonorRegReducers from "./slices/bloodDonorRegSlice";
import VerifyPhoneSlice from "./slices/verifySlice";
import rolesReducers from "./slices/rolesSlice";
import userRequestReducers from "./slices/userRequestSlice";
import adminBloodDonorReg from './slices/adminBloodDonorReg';
import adminPatientRegistration from './slices/adminPatientRegistration';
import adminUsersReducers from './slices/adminUserSlice';
import { patientApi } from '@/api/patientApi';
import { medicalHistoryApi } from '@/api/medicalHistoryApi';
import { medicalHistoryItemApi } from '@/api/medicalHistoryItemApi';

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
    projects: ourProjectReducers,
    notices: noticesReducers,
    pages: pagesReducers,
    tifSliders: tifSliderReducers,
    tifAttachmentPages: tifAttachmentPageReducers,
    years: yearsReducers,
    publications: publicationReducers,
    commonData: commonReducers,
    bloodDonorReg: bloodDonorRegReducers,
    adminBloodDonorReg: adminBloodDonorReg,
    adminPatientReg: adminPatientRegistration,
    VerifyPhone: VerifyPhoneSlice,
    rolesData: rolesReducers,
    userRequestData: userRequestReducers,
    adminUsers: adminUsersReducers,
    //public reducer
    public: publicReducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [medicalHistoryApi.reducerPath]: medicalHistoryApi.reducer,
    [medicalHistoryItemApi.reducerPath]: medicalHistoryItemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(patientApi.middleware)
      .concat(medicalHistoryApi.middleware)
      .concat(medicalHistoryItemApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
