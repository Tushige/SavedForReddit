import set from "lodash/fp/set";
import { FETCH_POSTS_PENDING, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, CLOSE_POSTS_WINDOW } from "../actions/postsTable";

const postsReducer = (posts = { data: {}, pending: true, visible: false }, action) => {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      console.log("reducer [FETCH_POSTS_PENDING]");
      return {
        data: null,
        visible: false,
        pending: true
      };
      break;
    case FETCH_POSTS_SUCCESS:
      console.log("reducer [FETCH_POSTS_SUCCESS]");
      return {
        data: action.payload,
        visible: true,
        pending: false
      };
      break;
    case FETCH_POSTS_ERROR:
      console.log("reducer [FETCH_POSTS_ERROR]");
      return posts;
      break;
    case CLOSE_POSTS_WINDOW:
      return {
        data: posts.data,
        visible: true,
        pending: true
      };
    default:
      return posts;
  }
};

export default postsReducer;
