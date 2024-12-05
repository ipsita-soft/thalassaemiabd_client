import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bloodDonorRegistration } from "../api/bloodDonorRegApi";

const initialState = {
    isLoading: false,
    isError: false,
    bloodDonorRegistrationData: [],
    genders: [],
    bloodGroups: [],
    error: '',
};

export const bloodDonorRegister = createAsyncThunk(
    'bloodDonorRegister',
    async (Data: FormData, { rejectWithValue }) => {
        try {
            const response = await bloodDonorRegistration(Data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.data);
        }
    }
);

const bloodDonorReg = createSlice({
    name: 'bloodDonorRegister',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bloodDonorRegister.pending, (state) => {
                state.isLoading = true;
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
            });
    }
});

export default bloodDonorReg.reducer;
