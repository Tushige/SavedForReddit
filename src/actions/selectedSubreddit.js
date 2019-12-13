export const SET_SELECTED_SUBREDDIT = 'SET_SELECTED_SUBREDDIT';

export function setSelectedSubreddit(selectedSubreddit) {
  return {
    type: SET_SELECTED_SUBREDDIT,
    payload: selectedSubreddit
  }
}