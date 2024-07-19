import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../apiConfig';

export interface Comment {
  id: number;
  designerId: number;
  userId: number;
  taskId: number;
  message: string;
  timestamp: string;
  status: 'open' | 'inProgress' | 'closed';
}

export interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: null,
};

export const fetchComments = createAsyncThunk<
  Comment[],
  void,
  { rejectValue: string }
>('comments/fetchComments', async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_ENDPOINTS.comments);
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch comments');
  }
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch comments';
      });
  },
});

export default commentsSlice.reducer;
