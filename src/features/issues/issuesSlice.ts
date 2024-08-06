import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../../apiConfig';
import axios from 'axios';

export interface Issue {
  id: number;
  key: string;
  status: 'New' | 'In Progress' | 'Done';
  designer: string | null;
  project: string;
  date_created: string;
  summary: string;
  received_from_client: number;
  send_to_project_manager: number;
  send_to_account_manager: number;
  send_to_designer: number;
  date_updated: string;
  date_started_by_designer: string | null;
  // date_started_by_designer: string;
  date_finished_by_designer: string | null;
  date_finished: string | null;
}

export interface IssuesState {
  issues: Issue[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  key: string;
}

const initialState: IssuesState = {
  issues: [],
  status: 'idle',
  error: null,
  key: '',
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

    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch comments'
    );
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
