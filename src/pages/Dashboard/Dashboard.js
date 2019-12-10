import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import firebase from '../../utils/firebase';
import axios from 'axios';
import './Dashboard.scss';

import {
    generateRedditAccessToken,
    setRedditAccessToken,
    getUser,
    getSavedPosts
} from '../../utils/reddit_helper';

function Dashboard(props) {
    const [user, setUser] = useState(null)
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
                await generateRedditAccessToken();
                const user = await getUser();
                if (user) {
                    setUser(user.data);
                    setLoading(false);
                }
            })()
        } catch (e) {
            console.error(e)
        }
    }, [])
    function getMe() {
        try {
            (async function user() {
                const posts = await getSavedPosts();
            })()
        } catch (e) {
            console.error(e)
        }
    }
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
            </div>
        </div>
    )
}

export default Dashboard;