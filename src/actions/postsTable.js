export const FETCH_POSTS_PENDING = "FETCH_POSTS_PENDING";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";
export const CLOSE_POSTS_WINDOW = "CLOSE_POSTS_WINDOW";

export function fetchPostsPending() {
  return {
    type: FETCH_POSTS_PENDING
  };
}

export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  };
}

export function fetchPostsError(error) {
  return {
    type: FETCH_POSTS_ERROR,
    error: error
  };
}

export function closePostsWindow() {
  return {
    type: CLOSE_POSTS_WINDOW
  };
}
