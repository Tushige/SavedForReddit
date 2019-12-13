import { connect } from 'react-redux';
import Dashboard from '../pages/Dashboard/Dashboard';
import {
  fetchSubredditsPending,
  fetchSubredditsSuccess,
  fetchSubredditsError
} from '../actions/subreddits';

import {
  getUser,
  getSubreddits,
} from '../utils/reddit_helper';

import {
  fetchUserPending,
  fetchUserSuccess,
  fetchUserError
} from '../actions/user';
import {
  setSelectedSubreddit
} from '../actions/selectedSubreddit';

const mapStateToProps = state => {
  return {
    subreddits: state.subreddits,
    user: state.user,
    posts: state.posts,
    selectedSubreddit: state.selectedSubreddit
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    async fetchUser() {
      dispatch(fetchUserPending());
      const user = await getUser();
      if (user.data) {
        dispatch(fetchUserSuccess(user.data));
      } else {
        dispatch(fetchUserError());
      }
    },
    async fetchSubreddits() {
      dispatch(fetchSubredditsPending());
      const subreddits_res = await getSubreddits();
      if (subreddits_res) {
        const subreddits = subreddits_res.data.data.children.map(subreddit => subreddit.data)
        dispatch(fetchSubredditsSuccess(subreddits));
      } else {
        dispatch(fetchSubredditsError());
      }
    },
    selectSubreddit(subreddit) {
      dispatch(setSelectedSubreddit(subreddit));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
