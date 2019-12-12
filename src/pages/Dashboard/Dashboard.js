import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import firebase from '../../utils/firebase';
import axios from 'axios';
import './Dashboard.scss';
import SubredditList from '../../components/SubredditList/SubredditList';
import WorkWindow from '../../components/WorkWindow/WorkWindow';

import {
    generateRedditAccessToken,
    setRedditAccessToken,
    getRedditToken,
    getUser,
    getSavedPosts,
    getSubreddits,
} from '../../utils/reddit_helper';

const Dashboard = React.memo((props) => {
    const [user, setUser] = useState(null);
    const [selectedSubreddit, setSelectedSubreddit] = useState(null);
    const [subreddits, setSubreddits] = useState(null);
    const [savedPosts, setSavedPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    function signOut() {
        firebase.auth().signOut().then(() => {
            console.log('sign out success!')
        }).catch(e => console.error(e))
        props.history.push('/');
    }

    useEffect(() => {
        try {
            (async function user() {
                const user = await getUser();
                if (user) {
                    setUser(user.data);
                }
                const subreddits_res = await getSubreddits();
                if (subreddits_res) {
                    setSubreddits(subreddits_res.data.data.children.map(subreddit => subreddit.data));
                }
                setLoading(false);

                const savedPosts = await getSavedPosts();
                if (savedPosts.data) {
                    setSavedPosts(savedPosts.data.data.children.map(post => post.data));
                }
            })()
        } catch (e) {
            console.error(e)
        }
    }, []);

    function subredditClickHandler(subreddit) {
        setSelectedSubreddit(subreddit);
    }
    function renderWorkview() {
        const posts = savedPosts.filter(post => {
            return post.subreddit_id === selectedSubreddit.name
        })
        return (
            <div className="work-view">
                <WorkWindow selectedSubreddit={selectedSubreddit} posts={posts} />
            </div>
        )
    }
    const workView = selectedSubreddit ? renderWorkview() : null;

    console.log('rendering dashboard')

    return loading ? null : (
        <div className="dashboard">
            <div className="main-view">
                <button onClick={signOut}>Sign out</button>
                <div className="gutter" />
                <div className="main-content">
                    <h1>
                        Hi {user.name}
                    </h1>
                    <p className="welcome-text">Tidying orders and relaxes the mind</p>
                    <div className="search-box">
                        insert search box here
                </div>
                    <SubredditList subreddits={subreddits} subredditClickHandler={subredditClickHandler} />
                </div>
            </div>
            {workView}
        </div>
    )
});

export default Dashboard;