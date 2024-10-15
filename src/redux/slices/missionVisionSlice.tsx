import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showApi, updateApi } from '@/redux/api/missionVision';

// Define the structure for your Setting data including images
type MissionVision = {
  id: string;
  mission_title: string;
  mission_image: string;
  mission_description: string;
  vision_title: string;
  vision_image: string;
  vision_description: string;
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
export const updateMissionVision = createAsyncThunk(
  'mission-vision/update',
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
export const showMissionVision = createAsyncThunk(
  'mission-vision/show',
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
    missionVision: {} as MissionVision,  // Store for a single setting
    meta: null as Meta | null,
    isLoading: false,
    isError: false,
    error: null as ErrorPayload | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMissionVision.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateMissionVision.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missionVision = {
          ...action.payload.data, // Update the setting with new data
          mission_image: `${action.payload.data.mission_image}?v=${new Date().getTime()}`, 
          vision_image: `${action.payload.data.vision_image}?v=${new Date().getTime()}`,
        };
      })
      .addCase(updateMissionVision.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(showMissionVision.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(showMissionVision.fulfilled, (state, action) => {
        state.missionVision = action.payload.data;
        state.isLoading = false;
      })
      .addCase(showMissionVision.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      });
  },
});

export default settingSlice.reducer;
