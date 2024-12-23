import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addApi, deleteApi, getApi, showApi, updateApi } from '@/redux/api/financialDonationApi';

type FinancialDonation = {
  id: string;
  image?: string;
  title?: string;
  description?: string;
  status?: string;
  sorting_index?: string;
};

type ErrorPayload = {
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

export const addFinancialDonation = createAsyncThunk(
  'financialDonation/add',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await addApi(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error adding data'));
    }
  }
);

export const getFinancialDonations = createAsyncThunk(
  'financialDonation/get',
  async (params: object = {}, { rejectWithValue }) => {
    try {
      const response = await getApi(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
    }
  }
);

export const updateFinancialDonation = createAsyncThunk(
  'financialDonation/update',
  async ({ id, data }: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const response = await updateApi(id, data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error updating data'));
    }
  }
);

export const showFinancialDonation = createAsyncThunk(
  'financialDonation/show',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await showApi(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch data');
    }
  }
);

export const deleteFinancialDonation = createAsyncThunk(
  'financialDonation/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : new Error('Error deleting data'));
    }
  }
);

const financialDonationSlice = createSlice({
  name: 'financialDonation',
  initialState: {
    financialDonations: [] as FinancialDonation[],
    financialDonation: {} as FinancialDonation,
    meta: null as Meta | null,
    isLoading: false,
    isError: false,
    error: null as ErrorPayload | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFinancialDonation.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(addFinancialDonation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.financialDonations.push(action.payload.data);
      })
      .addCase(addFinancialDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(getFinancialDonations.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getFinancialDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.financialDonations = action.payload?.data || [];
        state.meta = action.payload?.meta || null;
      })
      .addCase(getFinancialDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(updateFinancialDonation.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateFinancialDonation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.financialDonations = state.financialDonations.map((donation) =>
          donation.id === action.payload.data.id
            ? {
                ...action.payload.data,
                image: `${action.payload.data.image}?v=${new Date().getTime()}`,
              }
            : donation
        );
      })
      .addCase(updateFinancialDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(showFinancialDonation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(showFinancialDonation.fulfilled, (state, action) => {
        state.financialDonation = action.payload.data;
        state.isLoading = false;
      })
      .addCase(showFinancialDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      })
      .addCase(deleteFinancialDonation.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(deleteFinancialDonation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.financialDonations = state.financialDonations.filter(
          (donation) => donation.id !== action.payload
        );
      })
      .addCase(deleteFinancialDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as ErrorPayload;
      });
  },
});

export default financialDonationSlice.reducer;
