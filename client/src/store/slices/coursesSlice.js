import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPublicCourses = createAsyncThunk(
  'courses/fetchPublicCourses',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get('http://127.0.0.1:2727/getAllPublishedCourses', { headers });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const enrollCourse = createAsyncThunk(
  'courses/enrollCourse',
  async (courseId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const res = await axios.post(
        `http://127.0.0.1:2727/enroll/${courseId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    publicCourses: [],
    selectedCourse: null,
    myCourses: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
      localStorage.setItem('selectedCourseForPayment', JSON.stringify(action.payload));
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
      localStorage.removeItem('selectedCourseForPayment');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicCourses.fulfilled, (state, action) => {
        state.publicCourses = action.payload;
        state.loading = false;
      })
      .addCase(fetchPublicCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch courses';
      })
      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = null;
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.msg || action.payload?.message || 'Enrollment failed';
      });
  },
});

export const { setSelectedCourse, clearSelectedCourse, clearError } = coursesSlice.actions;
export default coursesSlice.reducer;
