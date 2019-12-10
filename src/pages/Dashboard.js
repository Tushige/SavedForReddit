import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import firebase from '../utils/firebase';
// import rp from 'request-promise'
import {
    REDDIT_CLIENT_ID,
    REDDIT_CLIENT_SECRET,
    REDDIT_TOKEN_URL,
    REDDIT_REDIRECT_URI
} from '../utils/consts';
import axios from 'axios';

function Dashboard(props) {
    let code = localStorage.getItem('code');
    function signOut() {
        firebase.auth().signOut().then(() => {
            console.log('sign out success!')
        }).catch(e => console.error(e))
        props.history.push('/');
    }
    function getRedditAccessToken() {
        const form = new FormData();
        form.set('grant_type', 'authorization_code');
        form.set('code', code);
        form.set('redirect_uri', REDDIT_REDIRECT_URI);
        const creds = btoa(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`);
        axios.post(REDDIT_TOKEN_URL, form, {
            'headers': {
                'Authorization': `Basic ${creds}`
            },
            transformRequest: [(data, headers) => {
                // transform the data
                delete headers.post['Content-Type'];
                return data;
            }]
        }).then(res => {
            console.log(res);
        }).catch(e => {
            console.error('error retrieving reddit api token');
            console.error(e);
        })
    }
    getRedditAccessToken();
    return (
        <>
            <div>Dashboard</div>
            <button onClick={signOut}>Sign out</button>
        </>
    )
}

export default Dashboard;