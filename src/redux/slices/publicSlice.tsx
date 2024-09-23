import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPublicSlider } from "../api/publicApi";

export const fetchPublicSlider = createAsyncThunk(
    'publicSlider/fetchPublicSlider',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getPublicSlider(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public sliders'))
        }
    }
);

const publicSlice = createSlice({
    name: 'public',
    initialState: {
        sliders: [],
        isLoading: false,
        isError: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPublicSlider.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicSlider.fulfilled, (state, action) => {
                state.isLoading = false;
                state.sliders = action.payload.data;
            })
            .addCase(fetchPublicSlider.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    }
});

export default publicSlice.reducer