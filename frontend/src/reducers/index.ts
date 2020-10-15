import { combineReducers } from 'redux';

import { PodcastState, PodcastReducer } from './PodcastReducer';

export interface ApplicationState {
  podcast: PodcastState | null;
}

export const ApplicationReducer =  combineReducers({ 
  podcast: PodcastReducer
})

