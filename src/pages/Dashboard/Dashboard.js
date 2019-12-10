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
    return (
        <div className="dashboard">
            <button onClick={signOut}>Sign out</button>
            <button onClick={getMe}>getme</button>
        </div>
    )
}

export default Dashboard;