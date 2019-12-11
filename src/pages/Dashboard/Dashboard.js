import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import firebase from '../../utils/firebase';
import axios from 'axios';
import './Dashboard.scss';
import SubredditList from '../../components/SubredditList/SubredditList';

import {
    generateRedditAccessToken,
    setRedditAccessToken,
    getRedditToken,
    getUser,
    getSavedPosts,
    getSubreddits,
} from '../../utils/reddit_helper';

function Dashboard(props) {
    const [user, setUser] = useState(null);
    const [subreddits, setSubreddits] = useState(null);
    const [loading, setLoading] = useState(true);
    function signOut() {
        firebase.auth().signOut().then(() => {
            console.log('sign out success!')
        }).catch(e => console.error(e))
        props.history.push('/');
    }
    useEffect(() => {
        try {
            const hasToken = getRedditToken();
            console.log(`hasToken ${hasToken}`)
            console.log(hasToken);
            (async function user() {
                if (!hasToken || hasToken === 'undefined' || hasToken === 'null') {
                    console.log('generating token')
                    await generateRedditAccessToken();
                }
                const user = await getUser();
                if (user) {
                    setUser(user.data);
                }
                const subreddits_res = await getSubreddits();
                if (subreddits_res) {
                    setSubreddits(subreddits_res.data.data.children.map(subreddit => subreddit.data));
                }
                setLoading(false);
            })()
        } catch (e) {
            console.error(e)
        }
    }, [])
    return loading ? null : (
        <div className="dashboard">
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

                <SubredditList subreddits={subreddits} />
            </div>
        </div>
    )
}

export default Dashboard;