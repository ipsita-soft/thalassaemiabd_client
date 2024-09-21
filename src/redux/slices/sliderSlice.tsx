import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addSliderApi, deleteSliderApi, getSlidersApi, showSliderApi, updateSliderApi } from '@/redux/api/slliderApi';

export const addSlider = createAsyncThunk(
  'sliders/addSlider',
  async (sliderData: FormData, { rejectWithValue }) => {
    try {
      const response = await addSliderApi(sliderData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error adding slider'));
    }
  }
);

export const fetchSliders = createAsyncThunk(
  'sliders/fetchSliders',
  async (params: object = {}, { rejectWithValue }) => {
    try {
      const response = await getSlidersApi(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error fetching sliders'));
    }
  }
);


export const updateSlider = createAsyncThunk(
  'sliders/updateSlider',
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await updateSliderApi(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error updating slider'));
    }
  }
);

export const fetchSlider = createAsyncThunk(
  'slider/show',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await showSliderApi(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch slider');
    }
  }
);


export const deleteSlider = createAsyncThunk(
  'sliders/deleteSlider',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteSliderApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error deleting slider'));
    }
  }
);

const sliderSlice = createSlice({
  name: 'sliders',
  initialState: {
    sliders: [],
    meta: null,
    isLoading: false,
    isError: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSlider.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(addSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sliders = [...state.sliders, action.payload.data];
      })
      .addCase(addSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(fetchSliders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sliders = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(updateSlider.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sliders = state.sliders.map((slider) =>
          slider.id === action.payload.data.id
            ? {
              ...action.payload.data,
              image: `${action.payload.data.image}?v=${new Date().getTime()}`,
            }
            : slider
        );
      })
      .addCase(updateSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(fetchSlider.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSlider.fulfilled, (state, action) => {
        state.sliders = action.payload.data;
        state.isLoading = false;
      })

      .addCase(fetchSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      })

      .addCase(deleteSlider.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('Deleted slider ID:', action.payload); // For debugging
      })
      
      .addCase(deleteSlider.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });

  },
});


export default sliderSlice.reducer;
