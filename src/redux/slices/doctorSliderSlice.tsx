import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addApi, deleteApi, getApi, showApi, updateApi } from '@/redux/api/doctorSliderApi';

type Data = {
  id: string;
  image?: string;
  sorting_index?: string;
  status?: string;
};

type ErrorPayload = {
  success?: boolean;
  message?: string;
  data?: any;
};


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

export const add = createAsyncThunk(
  'doctor-sliders/add',
  async (Data: FormData, { rejectWithValue }) => {
    try {
      const response = await addApi(Data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error adding Data'));
    }
  }
);

export const get = createAsyncThunk(
  'doctor-sliders/get',
  async (params: object = {}, { rejectWithValue }) => {
    try {
      const response = await getApi(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error fetching Data'));
    }
  }
);

export const update = createAsyncThunk(
  'doctor-sliders/update',
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await updateApi(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error updating data'));
    }
  }
);

export const show = createAsyncThunk(
  'doctor-sliders/show',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await showApi(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch data');
    }
  }
);

export const deleteData = createAsyncThunk(
  'doctor-sliders/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error deleting Data'));
    }
  }
);

const doctorSliderSlice = createSlice({
  name: 'doctor-sliders',
  initialState: {
    doctorSliders: [] as Data[],
    doctorSlider: {} as Data,
    meta: null as Meta | null,
    isLoading: false,
    isError: false,
    error: null as ErrorPayload | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(add.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorSliders.push(action.payload.data);
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(get.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorSliders = action.payload?.data || [];
        state.meta = action.payload?.meta || null;
      })
      .addCase(get.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorSliders = state.doctorSliders.map((doctorSlider) =>
          doctorSlider.id === action.payload.data.id
            ? {
              ...action.payload.data,
              image: `${action.payload.data.image}?v=${new Date().getTime()}`,
            }
            : doctorSlider
        );
        state.error = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(show.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(show.fulfilled, (state, action) => {
        state.doctorSliders = action.payload.data;
        state.isLoading = false;
      })
      .addCase(show.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(deleteData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorSliders = state.doctorSliders.filter(doctorSlider => doctorSlider.id !== action.payload);
        console.log('Deleted Data ID:', action.payload); // For debugging
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      });
  },
});

export default doctorSliderSlice.reducer;