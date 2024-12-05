import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { patientRegistration } from "../api/RegistrationApi";

const initialState = {
    isLoading: false,
    isError: false,
    patientRegistrationData: [],
    genders: [],
    bloodGroups: [],
    error: '',
};

export const subPatientRegistration = createAsyncThunk(
    'patientRegistration',
    async (Data: FormData, { rejectWithValue }) => {
        try {
            const response = await patientRegistration(Data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.data);
        }
    }
);

const bloodDonorReg = createSlice({
    name: 'patientRegistration',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(subPatientRegistration.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(subPatientRegistration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.patientRegistrationData = action.payload.data;
            })
            .addCase(subPatientRegistration.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
                // console.log('reject labib data ',state.error)
            });
    }
});

export default bloodDonorReg.reducer;
