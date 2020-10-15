import { createStore } from 'redux';
import { ApplicationReducer } from './reducers';

export const ApplicationStore = createStore(ApplicationReducer);