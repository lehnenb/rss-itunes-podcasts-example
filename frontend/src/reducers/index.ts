import { handleActions } from 'redux-actions';
import * as ACTION_TYPES from '../constants/actions';

interface ApplicationState {
  selectedPodcast: Record<string, string> | null;
}

const initialState: ApplicationState = {
  selectedPodcast: null,
};

export const ApplicationReducer = handleActions<ApplicationState, unknown>(
  {
    [ACTION_TYPES.SELECT_PODCAST]: (state: ApplicationState, action) => ({ ...state }),
    [ACTION_TYPES.SELECT_PODCAST_SUCCESS]: (state: ApplicationState, action) => ({ ...state }),
    [ACTION_TYPES.SELECT_PODCAST_FAIL]: (state: ApplicationState, action) => ({ ...state }),
  }, initialState
);