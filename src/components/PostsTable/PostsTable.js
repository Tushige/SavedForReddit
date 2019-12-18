import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthUser } from "../../utils/auth";
import "./PostsTable.scss";
import Axios from "axios";

function PostItem({ post }) {
  const { title } = post;
  return (
    <div className="post-item">
      <h4>{title}</h4>
    </div>
  );
}

function PostsTable(props) {
  const { selectedSubreddit, posts } = props;
  const { fetchSavedPosts, closePostsWindow } = props;
  if (!selectedSubreddit) {
    console.log("not rendering");
    return null;
  }
  useEffect(() => {
    fetchSavedPosts();
  }, []);
  if (!posts.visible) {
    return null;
  }
  function closeWindow() {
    // how do we close it?
    closePostsWindow();
  }
  let content = <div>loading...</div>;
  if (!posts.pending) {
    const { display_name, public_description } = selectedSubreddit;
    const postItems = posts.data.map(post => {
      return <PostItem key={post.id} post={post} />;
    });
    const content = posts.pending ? null : (
      <>
        <button onClick={closeWindow}>Close</button>
        <h3 className="subreddit_tytle">{display_name}</h3>
        <p className="subreddit-description">{public_description}</p>
        {postItems}
      </>
    );
  }
  return <div className="plans-table-window">{content}</div>;
}

export default PostsTable;
