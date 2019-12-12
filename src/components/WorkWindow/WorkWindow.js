import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../../utils/auth';
import './WorkWindow.scss';
import Axios from 'axios';

function PostItem({ post }) {
  const { title } = post;
  return (
    <div className="post-item">
      <h4>{title}</h4>
    </div>
  )
}

function WorkWindow({ selectedSubreddit, posts }) {
  console.log(posts)
  const { display_name, public_description } = selectedSubreddit;
  const postItems = posts.map(post => {
    return <PostItem key={post.id} post={post} />
  })
  return (
    <div className="work-window">
      <h3 className="subreddit_tytle">{display_name}</h3>
      <p className="subreddit-description">{public_description}</p>
      {postItems}
    </div>
  )
}

export default WorkWindow;
