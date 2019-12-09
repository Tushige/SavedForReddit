import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import firebase from '../utils/firebase';
import rp from 'request-promise'
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
    // function getRedditAccessToken() {
    //     axios.post(REDDIT_TOKEN_URL, {
    //         'grant_type': 'authorization_code',
    //         'code': code,
    //         'redirect_uri': REDDIT_REDIRECT_URI
    //     }, {
    //             'headers': {
    //                 'Authorization': {
    //                     'user': REDDIT_CLIENT_ID,
    //                     'password': REDDIT_CLIENT_SECRET
    //                 }
    //             }
    //         }).then(res => {
    //             console.log(res);
    //         }).catch(e => {
    //             console.error('error retrieving reddit api token');
    //             console.error(e);
    //         })
    // }
    async function getRedditAccessToken() {
        const header = new Headers();
        header.set('Authorization', `Basic ${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`);
        fetch(REDDIT_TOKEN_URL, {
            method: 'POST',
            header,
            body: JSON.stringify({
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': REDDIT_REDIRECT_URI
            })
        }).then(response => {
            console.log(response)
            return response.json().then(data => {
                console.log(data)
            }).catch(e => {
                console.error(e)
            })
        });
    }
    function getRedditAccessToken2() {
        // rp({
        //     json: true,
        //     baseUrl: 'https://www.reddit.com',
        //     uri: 'api/v1/access_token',
        //     method: 'post',
        //     headers: {

        //     },
        //     form: {
        //         'grant_type': 'authorization_code',
        //         'code': code,
        //         'redirect_uri': REDDIT_REDIRECT_URI
        //     }
        // }).then(token => {
        //     console.log(token)
        // })
    }
    getRedditAccessToken2();
    return (
        <>
            <div>Dashboard</div>
            <button onClick={signOut}>Sign out</button>
        </>
    )
}

export default Dashboard;