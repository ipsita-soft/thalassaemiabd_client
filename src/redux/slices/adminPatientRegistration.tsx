import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addApi, getApi, showApi } from "../api/adminPatientRegApi";

const initialState = {
    isLoading: false,
    isError: false,
    patientRegistrationData: [],
    patientRegistrationDataSing: [],
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

export const adminPatientAdd = createAsyncThunk(
    'adminPatientAdd',
    async (Data: FormData, { rejectWithValue }) => {
        try {
            const response = await addApi(Data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.data);
        }
    }
);

export const get = createAsyncThunk(
    'adminPatientGet',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getApi(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : "Error fetching data");
        }
    }
);



export const show = createAsyncThunk(
    'adminPatientShow',
    async (id: string, { rejectWithValue }) => {
        try {
            const data = await showApi(id);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch data');
        }
    }
);


const adminPatientRegistration = createSlice({
    name: 'adminBloodDonorRegister',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminPatientAdd.pending, (state) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(adminPatientAdd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.patientRegistrationData = action.payload.data;
            })
            .addCase(adminPatientAdd.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload || "Failed to add patient data";
            })

            .addCase(get.pending, (state) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(get.fulfilled, (state, action) => {
                state.isLoading = false;
                state.patientRegistrationData = action.payload?.data || [];
                state.meta = action.payload?.meta || null;
            })
            .addCase(get.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload || "Failed to fetch data";
            })

            .addCase(show.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(show.fulfilled, (state, action) => {
                state.patientRegistrationDataSing = action.payload?.data || action.payload; 
                state.isLoading = false;
            })
            .addCase(show.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload || "Failed to fetch data";
            })


            ;
    }
});

export default adminPatientRegistration.reducer;
