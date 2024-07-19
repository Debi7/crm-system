import { combineReducers } from '@reduxjs/toolkit';
import commentsReducer, {
  CommentsState,
} from '../features/comments/commentsSlice';
import designersReducer, {
  DesignersState,
} from '../features/designers/designersSlice';
import issuesReducer, { IssuesState } from '../features/issues/issuesSlice'; // Обновлено с tasksReducer на issuesReducer
import projectsReducer, {
  ProjectsState,
} from '../features/projects/projectsSlice';

export interface RootState {
  comments: CommentsState;
  designers: DesignersState;
  issues: IssuesState;
  projects: ProjectsState;
}

const rootReducer = combineReducers({
  comments: commentsReducer,
  designers: designersReducer,
  issues: issuesReducer,
  projects: projectsReducer,
});

export default rootReducer;
