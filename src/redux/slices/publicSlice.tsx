import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPublicSlider } from "../api/publicApi";

// Define a type for the slider objects
interface Slider {
    id: number;
    image: string;
    sorting_index: number; // Added sorting_index
    status: string;        // Added status
}

// Define a type for the slice state
interface PublicState {
    sliders: { data: Slider[] };
    isLoading: boolean;
    isError: boolean;
    error: string | null;
}

// Initial state
const initialState: PublicState = {
    sliders: { data: [] },
    isLoading: false,
    isError: false,
    error: null
};

// Async thunk to fetch the sliders
export const fetchPublicSlider = createAsyncThunk(
    'publicSlider/fetchPublicSlider',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getPublicSlider(params);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public sliders'));
        }
    }
);

const publicSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPublicSlider.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicSlider.fulfilled, (state, action: PayloadAction<Slider[]>) => {
                state.isLoading = false;
                state.sliders = { data: action.payload };   
            })
            .addCase(fetchPublicSlider.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    }
});

export default publicSlice.reducer;
