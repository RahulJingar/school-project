import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const studentLogin = createAsyncThunk(
  'auth/studentLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://127.0.0.1:2727/schoolUser/login', credentials);
      localStorage.setItem('studentToken', res.data.token);
      localStorage.setItem('currentStudent', JSON.stringify(res.data.data));
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      localStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(studentLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.role = 'student';
        state.token = action.payload.token;
      })
      .addCase(studentLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
