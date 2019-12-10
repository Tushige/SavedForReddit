/**this file contains helper functions to interact with the reddit api */
import {
  REDDIT_API_URL,
  REDDIT_TOKEN_URL,
  REDDIT_REDIRECT_URI,
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET
} from './consts';
import axios from 'axios';

/** 
 * gets access token from reddit 
 */
export function generateRedditAccessToken() {
  return new Promise((resolve, reject) => {
    let code = localStorage.getItem('code');
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
      if (res.data.access_token) {
        setRedditAccessToken(res.data.access_token);
      }
      resolve();
    }).catch(e => {
      console.error('error retrieving reddit api token');
      console.error(e);
      reject(e);
    })
  })
}
/**
 * saves the access token locally in our app
 */
export function setRedditAccessToken(access_token) {
  localStorage.setItem('access_token', access_token);
}
/**
 * returns the access token that we got from reddit
 */
export function getRedditToken() {
  return localStorage.getItem('access_token');
}
/**
 * API functions
 */
export const api = axios.create({
  baseURL: REDDIT_API_URL,
  timeout: 3000,
  headers: {
    'Authorization': `Bearer ${getRedditToken()}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export function getUser() {
  return api.get(REDDIT_API_URL + '/api/v1/me')
}
export function getSavedPosts() {
  return api.get(REDDIT_API_URL + '/user/IamNervS/saved');
}