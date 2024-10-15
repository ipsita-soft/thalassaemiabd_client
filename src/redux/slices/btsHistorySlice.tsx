import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showApi, updateApi } from '@/redux/api/btsHistoryApi';

// Define the structure for your Setting data including images
type Data = {
  id: string;
  mtitle: string;
  mimage: string;
  mdescription: string;
  vtitle: string;
  vimage: string;
  vdescription: string;
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
export const updateBtsHistory = createAsyncThunk(
  'bts-history/update',
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
export const showBtsHistory = createAsyncThunk(
  'bts-history/show',
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
const btsHistorySlice = createSlice({
  name: 'settings',
  initialState: {
    BtsHistory: {} as Data,  // Store for a single setting
    meta: null as Meta | null,
    isLoading: false,
    isError: false,
    error: null as ErrorPayload | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBtsHistory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateBtsHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.BtsHistory = {
          ...action.payload.data, // Update the setting with new data
          mimage: `${action.payload.data.mimage}?v=${new Date().getTime()}`, 
          vimage: `${action.payload.data.vimage}?v=${new Date().getTime()}`,
        };
      })
      .addCase(updateBtsHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(showBtsHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(showBtsHistory.fulfilled, (state, action) => {
        state.BtsHistory = action.payload.data;
        state.isLoading = false;
      })
      .addCase(showBtsHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      });
  },
});

export default btsHistorySlice.reducer;
