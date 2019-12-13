import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import firebase from '../../utils/firebase';
import axios from 'axios';
import './Dashboard.scss';
import SubredditList from '../../components/SubredditList/SubredditList';
import PostsTableContainer from '../../containers/PostsTableContainer';

import {
    generateRedditAccessToken,
    setRedditAccessToken,
    getRedditToken,
    getUser,
    getSavedPosts,
    getSubreddits,
} from '../../utils/reddit_helper';

const Dashboard = (props) => {
    console.log("dashboarding rendering");
    const { fetchUser, fetchSubreddits, selectSubreddit } = props
    const { user, subreddits, selectedSubreddit, posts } = props;

    function signOut() {
        firebase.auth().signOut().then(() => {
            console.log('sign out success!')
        }).catch(e => console.error(e))
        props.history.push('/');
    }

    useEffect(() => {
        try {
            (async function user() {
                fetchUser();
                fetchSubreddits();
            })()
        } catch (e) {
            console.error(e)
        }
    }, []);

    function subredditClickHandler(subreddit) {
        selectSubreddit(subreddit);
    }
    function renderWorkview() {
        return (
            <div className="work-view">
                <PostsTableContainer />
            </div>
        )
    }
    const workView = selectedSubreddit ? renderWorkview() : null;

    return props.user.pending && props.subreddits.pending ? null : (
        <div className="dashboard">
            <div className="main-view">
                <button onClick={signOut}>Sign out</button>
                <div className="gutter" />
                <div className="main-content">
                    <h1>
                        Hi {user.data.name}
                    </h1>
                    <p className="welcome-text">Tidying orders and relaxes the mind</p>
                    <div className="search-box">
                        insert search box here
                </div>
                    <SubredditList subreddits={subreddits.data} subredditClickHandler={subredditClickHandler} />
                </div>
            </div>
            {workView}
        </div>
    )
}

export default Dashboard;