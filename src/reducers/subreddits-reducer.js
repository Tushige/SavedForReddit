import set from 'lodash/fp/set';
import {
  FETCH_SUBREDDITS_PENDING,
  FETCH_SUBREDDITS_SUCCESS,
  FETCH_SUBREDDITS_ERROR
} from '../actions/subreddits';

const subredditsReducer = (subreddits = { data: null, pending: true }, action) => {
  switch (action.type) {
    case FETCH_SUBREDDITS_PENDING:
      return {
        data: [],
        pending: true
      }
      break;
    case FETCH_SUBREDDITS_SUCCESS:
      return {
        data: action.payload,
        pending: false
      }
      break;
    case FETCH_SUBREDDITS_ERROR:
      return subreddits
      break;
    default:
      return subreddits;
  }
};

export default subredditsReducer;
