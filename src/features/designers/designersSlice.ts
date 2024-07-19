import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../../apiConfig';
import axios from 'axios';

export interface Task {
  timeSpent: number;
  // Другие поля задачи, если они есть
}

export interface Designer {
  id: number;
  avatar: string;
  name: string;
  email: string;
  tasksCompleted: number;
  tasksInProgress: number;
  tasks?: Task[];
  medianTime?: number;
}

export interface DesignersState {
  designers: Designer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DesignersState = {
  designers: [],
  status: 'idle',
  error: null,
};

// Асинхронное действие для получения списка дизайнеров
export const fetchDesigners = createAsyncThunk<
  Designer[],
  {
    status?: 'New' | 'In Progress' | 'Done';
    key?: string;
    ordering?: '-email' | 'email' | '-username' | 'username';
    page?: number;
    limit?: number;
  },
  { rejectValue: string }
>(
  'designers/fetchDesigners',
  async ({ status, key, ordering, page, limit = 16 }, thunkAPI) => {
    try {
      const actualLimit = limit > 128 ? 128 : limit;

      let params: any = { page, limit: actualLimit };

      if (status) {
        params.status = status;
      }

      if (key) {
        params.key = key;
      }

      if (ordering) {
        params.ordering = ordering;
      }

      const response = await axios.get(API_ENDPOINTS.designers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch designers');
    }
  }
);

const designersSlice = createSlice({
  name: 'designers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesigners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDesigners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.designers = action.payload;
      })
      .addCase(fetchDesigners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch designers';
      });
  },
});

export default designersSlice.reducer;
