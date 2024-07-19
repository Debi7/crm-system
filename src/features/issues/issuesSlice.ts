import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../../apiConfig';
import axios from 'axios';

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'New' | 'In Progress' | 'Done';
  assignedTo: number;
  createdAt: string;
  updatedAt: string;
  received_from_client: number; // сумма прибыли от клиента
  send_to_project_manage: number; // сумма расходов на управление проектом
}

export interface IssuesState {
  issues: Issue[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IssuesState = {
  issues: [],
  status: 'idle',
  error: null,
};

export const fetchIssues = createAsyncThunk<
  Issue[],
  {
    status?: 'New' | 'In Progress' | 'Done';
    key?: string;
  },
  { rejectValue: string }
>('issues/fetchIssues', async ({ status, key }, thunkAPI) => {
  try {
    const response = await axios.get(API_ENDPOINTS.issues, {
      params: { status, key },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch issues');
  }
});

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch issues';
      });
  },
});

export default issuesSlice.reducer;
