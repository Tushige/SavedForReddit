import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../../utils/auth';
import './SubredditList.scss';
import Axios from 'axios';

/**
 * userfule fields
 * banner_background_image
 * display_name
 * public_description
 */
function Subreddit({ subreddit, imageUrl, subredditClickHandler }) {
  const { display_name, banner_background_image, public_description } = subreddit;
  function clickHandler(e) {
    subredditClickHandler(subreddit);
  }
  return (
    <div className="subreddit-item" onClick={clickHandler}>
      <div className="subreddit-item__icon" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="subreddit-item__title">{display_name}</div>
    </div>
  )
}

function SubredditList({ subreddits, subredditClickHandler }) {
  const subredditItems = subreddits.map((subreddit, idx) => {
    const imageUrl = `https://source.unsplash.com/random/150x150?sig=${idx}`
    return <Subreddit key={subreddit.display_name} subreddit={subreddit} imageUrl={imageUrl} subredditClickHandler={subredditClickHandler} />
  })
  return (
    <div className="subreddit-list">
      <h3>Subreddits <span className="subreddits_count">({subreddits.length})</span></h3>
      <div className="subreddit-items">
        {subredditItems}
      </div>
    </div>
  )
}

export default SubredditList;
