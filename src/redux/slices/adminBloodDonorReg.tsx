import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bloodDonorRegistration, getApi } from "../api/adminBloodDonorRegApi";


const initialState = {
    isLoading: false,
    isError: false,
    bloodDonorRegistrationData: [],
    meta: null as Meta | null,
    genders: [],
    bloodGroups: [],
    error: '',
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



export const bloodDonorRegister = createAsyncThunk(
    'adminBloodDonorRegister',
    async (Data: FormData, { rejectWithValue }) => {
        try {
            const response = await bloodDonorRegistration(Data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.data);
        }
    }
);


export const get = createAsyncThunk(
    'adminBloodDonor/get',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getApi(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching Data'));
        }
    }
);


const adminBloodDonorRegis = createSlice({
    name: 'adminBloodDonorRegister',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bloodDonorRegister.pending, (state) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(bloodDonorRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bloodDonorRegistrationData = action.payload.data;
            })
            .addCase(bloodDonorRegister.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
                // console.log('reject labib data ',state.error)
            })

            .addCase(get.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(get.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bloodDonorRegistrationData = action.payload?.data || [];
                state.meta = action.payload?.meta || null;
            })
            .addCase(get.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })
            ;
    }
});

export default adminBloodDonorRegis.reducer;
