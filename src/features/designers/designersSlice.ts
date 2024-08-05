import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS } from '../../apiConfig';
import axios from 'axios';
import { Issue } from '../issues/issuesSlice';

export interface Designer {
  avatar: string;
  username: string;
  email: string;
  thumbnails: {
    avatar: string;
    avatar2x: string;
    avatarWebp: string;
    avatarWebp2x: string;
  };
  issues: Issue[];
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

// получение списка дизайнеров
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

      const response = await axios.get(API_ENDPOINTS.designers, {
        params,
      });

      console.log('API Response:', response.data);

      if (response.data && response.data.results) {
        return response.data.results.map(
          (item: any): Designer => ({
            avatar: item.avatar,
            username: item.username,
            email: item.email,
            thumbnails: {
              avatar: item.thumbnails.avatar,
              avatar2x: item.thumbnails.avatar_2x,
              avatarWebp: item.thumbnails.avatar_webp,
              avatarWebp2x: item.thumbnails.avatar_webp_2x,
            },
            issues: item.issues.map(
              (issue: any): Issue => ({
                id: issue.id,
                key: issue.key,
                status: issue.status || 'New',
                designer: item.username,
                project: 'Неизвестный проект',
                date_created: issue.date_created,
                summary: 'Нет резюме',
                received_from_client: 0,
                send_to_project_manager: 0,
                send_to_account_manager: 0,
                send_to_designer: 0,
                date_updated: new Date().toISOString(),
                date_started_by_designer: issue.date_started_by_designer,
                date_finished_by_designer: issue.date_finished_by_designer,
                date_finished: null,
              })
            ),
          })
        );
      } else {
        console.error(
          'Expected an object with results but got:',
          response.data
        );
        return [];
      }
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
        state.error = action.payload || 'Failed to fetch designers';
        console.error('Error fetching designers:', action.payload);
      });
  },
});

export default designersSlice.reducer;
