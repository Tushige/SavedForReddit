import set from 'lodash/fp/set';
import {
  SET_SELECTED_SUBREDDIT
} from '../actions/selectedSubreddit';

const selectedSubredditReducer = (selectedSubreddit = null, action) => {
  switch (action.type) {
    case SET_SELECTED_SUBREDDIT:
      console.log('reducer [SET_SELECTED_SUBREDDIT]')
      return action.payload;
      break;
    default:
      return selectedSubreddit;
  }
};

export default selectedSubredditReducer;
