import set from 'lodash/fp/set';
import {
  FETCH_POSTS_PENDING,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
} from '../actions/postsTable';

const postsReducer = (posts = { data: {}, pending: true }, action) => {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      console.log('reducer [FETCH_POSTS_PENDING]')
      return {
        data: null,
        pending: true
      }
      break;
    case FETCH_POSTS_SUCCESS:
      console.log('reducer [FETCH_POSTS_SUCCESS]')
      return {
        data: action.payload,
        pending: false
      }
      break;
    case FETCH_POSTS_ERROR:
      console.log('reducer [FETCH_POSTS_ERROR]')
      return posts;
      break;
    default:
      return posts;
  }
};

export default postsReducer;
