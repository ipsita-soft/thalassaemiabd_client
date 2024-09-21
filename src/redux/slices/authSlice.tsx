import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

// Thunk for logging in the user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post('/login', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  roles: localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : [],
  permissions: localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions')) : [],
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.roles = [];
      state.permissions = [];
      localStorage.removeItem('token'); // Clear token on logout
      localStorage.removeItem('user');  // Clear user on logout
      localStorage.removeItem('roles'); // Clear roles on logout
      localStorage.removeItem('permissions'); // Clear permissions on logout
    },
    setUser(state, action) {
      state.user = action.payload;
      state.roles = action.payload.roles;
      state.permissions = action.payload.permissions;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('roles', JSON.stringify(action.payload.roles));
      localStorage.setItem('permissions', JSON.stringify(action.payload.permissions));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.status = 'succeeded';
        state.token = data.token;
        state.user = data;
        state.roles = data.roles || [];
        state.permissions = data.permissions || [];
        localStorage.setItem('token', data.token); // Store token in localStorage
        localStorage.setItem('user', JSON.stringify(data)); // Store user data
        localStorage.setItem('roles', JSON.stringify(data.roles)); // Store roles
        localStorage.setItem('permissions', JSON.stringify(data.permissions)); // Store permissions
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
