import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { verifyPhone, resendVerifyPhone } from "../api/publicApi";

const initialState = {
    isLoading: false,
    isError: false,
    userResendVerifyPhoneData: [],
    verifyPhone: [],
    genders: [],
    bloodGroups: [],
    error: '',
};


export const userResendVerifyPhone = createAsyncThunk(
    'userResendVerifyPhone',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await resendVerifyPhone(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.data);
        }
    }
);

export const subverifyPhone = createAsyncThunk(
    'subverifyPhone',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await verifyPhone(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);


const VerifyPhoneSlice = createSlice({
    name: 'VerifyPhone',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userResendVerifyPhone.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(userResendVerifyPhone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userResendVerifyPhoneData = action.payload.data;
            })
            .addCase(userResendVerifyPhone.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })



            .addCase(subverifyPhone.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(subverifyPhone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.verifyPhone = action.payload.data;
            })
            .addCase(subverifyPhone.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    }
});

export default VerifyPhoneSlice.reducer;
