import * as ACTION_TYPES from '../constants/actions';

export function selectPodcast(url: string) {
  return {
    type: ACTION_TYPES.SELECT_PODCAST,
    url,
  }
}
