import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProjectsFromAPI } from '../../services/api';
import { Project } from '../types';

export interface ProjectsState {
  projects: Project[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  status: 'idle',
  error: null,
};

export const fetchProjects = createAsyncThunk<
  Project[],
  void,
  { rejectValue: string }
>('projects/fetchProjects', async (_, thunkAPI) => {
  try {
    const projects = await fetchProjectsFromAPI();
    return projects;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch comments'
    );
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch projects';
      });
  },
});

export default projectsSlice.reducer;
