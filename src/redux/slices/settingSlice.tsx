import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showApi, updateApi } from '@/redux/api/settingApi';

// Define the structure for your Setting data including images
type SettingData = {
  website_title: string;
  slogan: string;
  email: string;
  webmail: string;
  phone: string;
  whatsapp: string;
  telephone: string;
  googlemap: string;
  websitelink: string;
  facebook: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  copyrighttext: string;
  location: string;
  headerlogo?: string;
  footerlogo?: string;
  favicon?: string;
};

type ErrorPayload = {
  success?: boolean;
  message?: string;
  data?: any;
};

// Meta interface for pagination or additional metadata if needed
interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// Async thunk to update the setting
export const updateSetting = createAsyncThunk(
  'settings/update',
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await updateApi(id, data); // Call API to update data
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error updating setting data'));
    }
  }
);

// Async thunk to fetch the setting
export const showSetting = createAsyncThunk(
  'settings/show',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await showApi(id); // Call API to fetch data
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch setting data');
    }
  }
);

// Setting slice to manage state related to settings
const settingSlice = createSlice({
  name: 'settings',
  initialState: {
    setting: {} as SettingData,  // Store for a single setting
    meta: null as Meta | null,
    isLoading: false,
    isError: false,
    error: null as ErrorPayload | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSetting.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.setting = {
          ...action.payload.data, // Update the setting with new data
          headerlogo: `${action.payload.data.headerlogo}?v=${new Date().getTime()}`, // Prevent caching
          footerlogo: `${action.payload.data.footerlogo}?v=${new Date().getTime()}`,
          favicon: `${action.payload.data.favicon}?v=${new Date().getTime()}`,
        };
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(showSetting.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(showSetting.fulfilled, (state, action) => {
        state.setting = action.payload.data;
        state.isLoading = false;
      })
      .addCase(showSetting.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      });
  },
});

export default settingSlice.reducer;
