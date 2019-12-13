export const FETCH_SUBREDDITS_PENDING = 'FETCH_SUBREDDITS_PENDING';
export const FETCH_SUBREDDITS_SUCCESS = 'FETCH_SUBREDDITS_SUCCESS';
export const FETCH_SUBREDDITS_ERROR = 'FETCH_SUBREDDITS_ERROR';

export function fetchSubredditsPending() {
  return {
    type: FETCH_SUBREDDITS_PENDING
  }
}

export function fetchSubredditsSuccess(subreddits) {
  return {
    type: FETCH_SUBREDDITS_SUCCESS,
    payload: subreddits
  }
}

export function fetchSubredditsError(error) {
  return {
    type: FETCH_SUBREDDITS_ERROR,
    error: error
  }
}