import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthUser } from "../../utils/auth";

import ScrollableWindow from "../ScrollableWindow/ScrollableWindow";
import "./SubredditList.scss";
import Axios from "axios";

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
  );
}
function Column({ children }) {
  return <div className="subreddit-column">{children}</div>;
}
function SubredditList({ subreddits, subredditClickHandler }) {
  // const subredditItems = subreddits.map((subreddit, idx) => {
  //   const imageUrl = `https://source.unsplash.com/random/150x150?sig=${idx}`
  //   return <Subreddit key={subreddit.display_name} subreddit={subreddit} imageUrl={imageUrl} subredditClickHandler={subredditClickHandler} />
  // })
  let subredditItems2 = [];
  for (let i = 0; i < subreddits.length - 1; i += 2) {
    // can't handle odd number of elements. DOesn't render the last one
    const subreddit = subreddits[i];
    const imageUrl = `https://source.unsplash.com/random/250x250?sig=${i}`;
    const subreddit2 = subreddits[i + 1];
    const imageUrl2 = `https://source.unsplash.com/random/250x250?sig=${i + 1}`;
    const item = (
      <Subreddit
        key={subreddit.display_name}
        subreddit={subreddit}
        imageUrl={imageUrl}
        subredditClickHandler={subredditClickHandler}
      />
    );
    const item2 = (
      <Subreddit
        key={subreddit2.display_name}
        subreddit={subreddit2}
        imageUrl={imageUrl2}
        subredditClickHandler={subredditClickHandler}
      />
    );
    const c = (
      <Column key={i}>
        {item}
        {item2}
      </Column>
    );
    subredditItems2.push(c);
  }
  const windowWidth = 1500;
  const width = subredditItems2.length * 250;
  return (
    <div className="subreddits-window">
      <div className="subreddit-list">
        <h3>
          Subreddits <span className="subreddits_count">({subreddits.length})</span>
        </h3>
        <ScrollableWindow width={windowWidth}>
          <div className="subreddit-items" style={{ width: `${width}px` }}>
            {subredditItems2}
          </div>
        </ScrollableWindow>
      </div>
    </div>
  );
}

export default SubredditList;
