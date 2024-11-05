import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getBloodGroup, getGenders, getMaritalStatus, permissionsAll } from "../api/publicApi";

const initialState = {
    isLoading: false,
    isError: false,
    maritalStatus: [],
    permissions:[],
    genders: [],
    bloodGroups: [],
    error: '',
}


export const fetchBloodGroup = createAsyncThunk(
    'fetchBloodGroup',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getBloodGroup(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);



export const fetchPermissions = createAsyncThunk(
    'fetchPermissions',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await permissionsAll(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);


export const fetchMaritalStatus = createAsyncThunk(
    'fetchMaritalStatus',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getMaritalStatus(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);
export const fetchGenders = createAsyncThunk(
    'fetchGenders',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getGenders(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);

const commonSlice = createSlice({
    name: 'marital-status',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaritalStatus.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchMaritalStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.maritalStatus = action.payload.data;
            })
            .addCase(fetchMaritalStatus.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })
            .addCase(fetchGenders.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchGenders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.genders = action.payload.data;
            })
            .addCase(fetchGenders.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })
            .addCase(fetchBloodGroup.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchBloodGroup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.bloodGroups = action.payload.data;
            })
            .addCase(fetchBloodGroup.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })
            .addCase(fetchPermissions.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.permissions = action.payload.data;
            })
            .addCase(fetchPermissions.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

    }
});

export default commonSlice.reducer;