import { connect } from "react-redux";
import PostsTable from "../components/PostsTable/PostsTable";
import { fetchPostsPending, fetchPostsSuccess, fetchPostsError, closePostsWindow } from "../actions/postsTable";

import { getSavedPosts } from "../utils/reddit_helper";

const mapStateToProps = state => {
  console.log("is posts pending");
  console.log(state.posts.pending);
  return {
    posts: {
      ...state.posts,
      data: !state.posts.pending
        ? state.posts.data.filter(post => {
            return post.subreddit_id === state.selectedSubreddit.name;
          })
        : state.posts.data
    },
    selectedSubreddit: state.selectedSubreddit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    async fetchSavedPosts() {
      dispatch(fetchPostsPending());
      const posts_res = await getSavedPosts();
      if (posts_res) {
        const posts = posts_res.data.data.children.map(post => post.data);
        dispatch(fetchPostsSuccess(posts));
      } else {
        dispatch(fetchPostsError());
      }
    },
    closePostsWindow() {
      dispatch(closePostsWindow());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsTable);
