import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

import * as ACTION_TYPES from '../constants/actions';

import { ApplicationState } from './index';

export interface PodcastState {
  url: string;
  name?: string;
  errors?: {};
}

// Selector Input
const getPodcastState = (state: ApplicationState) => state.podcast;

export const getPodcast = createSelector(
  [getPodcastState],
  (selectedPodcast: PodcastState | null) => selectedPodcast,
);

export const PodcastReducer = handleActions<PodcastState | null, unknown>(
  {
    [ACTION_TYPES.SELECT_PODCAST]: (state: PodcastState | null, action: unknown) => ((state) ? { ...state } : null),
    [ACTION_TYPES.SELECT_PODCAST_SUCCESS]: (state: PodcastState | null, action: unknown) => ((state) ? { ...state } : null),
    [ACTION_TYPES.SELECT_PODCAST_FAIL]: (state: PodcastState | null, action: unknown) => ((state) ? { ...state } : null),
  }, null
);
