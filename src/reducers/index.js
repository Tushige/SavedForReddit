import { combineReducers } from 'redux';
import subreddits from './subreddits-reducer';
import user from './user-reducer';
import posts from './posts-reducer';
import selectedSubreddit from './selectedSubreddit-reducer';

export default combineReducers({
  subreddits,
  user,
  posts,
  selectedSubreddit
});
