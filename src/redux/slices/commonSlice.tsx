import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { diseaseType, getBloodGroup, getDepartments, getGenders, getMaritalStatus, getRoles, getRoleWithUser, height, permissionsAll, weight } from "../api/publicApi";

const initialState = {
    isLoading: false,
    isError: false,
    maritalStatus: [],
    permissions: [],
    genders: [],
    bloodGroups: [],
    departments: [],
    roleWithUser: [],
    roleWithPatient: [],
    roleWithDoctor: [],
    roles: [],
    diseaseTypes: [],
    heights: [],
    weights: [],
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

export const fetchDepartments = createAsyncThunk(
    'fetchDepartments',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getDepartments(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);

export const fetchRoles = createAsyncThunk(
    'fetchRoles',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getRoles(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);

export const fetchRoleWithPatient = createAsyncThunk(
    'fetchRoleWithPatient',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getRoleWithUser(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);

export const fetchRoleWithUser = createAsyncThunk(
    'fetchRoleWithUser',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getRoleWithUser(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);


export const fetchRoleWithDoctor = createAsyncThunk(
    'fetchRoleWithDoctor',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getRoleWithUser(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);



export const fetchDiseaseType = createAsyncThunk(
    'fetchDiseaseType',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await diseaseType(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);
export const fetchHeight = createAsyncThunk(
    'fetchHeight',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await height(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);

export const fetchWeight = createAsyncThunk(
    'fetchWeight',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await weight(params);
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




            .addCase(fetchDepartments.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.departments = action.payload.data;
            })
            .addCase(fetchDepartments.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })



            .addCase(fetchRoles.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.roles = action.payload.data;
            })
            .addCase(fetchRoles.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })


            .addCase(fetchRoleWithUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchRoleWithUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.roleWithUser = action.payload.data;
            })
            .addCase(fetchRoleWithUser.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

            .addCase(fetchRoleWithPatient.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchRoleWithPatient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.roleWithPatient = action.payload.data;
            })
            .addCase(fetchRoleWithPatient.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })



            .addCase(fetchRoleWithDoctor.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchRoleWithDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.roleWithDoctor = action.payload.data;
            })
            .addCase(fetchRoleWithDoctor.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })



            .addCase(fetchDiseaseType.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchDiseaseType.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.diseaseTypes = action.payload.data;
            })
            .addCase(fetchDiseaseType.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })



            .addCase(fetchHeight.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchHeight.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.heights = action.payload.data;
            })
            .addCase(fetchHeight.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })


            .addCase(fetchWeight.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchWeight.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.weights = action.payload.data;
            })
            .addCase(fetchWeight.rejected, (state, action: PayloadAction<any>) => {
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