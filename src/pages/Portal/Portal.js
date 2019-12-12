import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  getRedditToken,
  generateRedditAccessToken
} from '../../utils/reddit_helper';
function Portal({ location }) {
  const [loading, setLoading] = useState(true);
  if (location.search) {
    let query = new URLSearchParams(location.search);
    let code = query.get('code');
    localStorage.setItem('code', code);
    (async function getToken() {
      const hasToken = getRedditToken();
      if (!hasToken || hasToken === 'undefined' || hasToken === 'null') {
        console.log('generating token')
        await generateRedditAccessToken();
      }
    })();
  } else {
    return <Redirect to='/signout'></Redirect>;
  }
  return <Redirect to='/dashboard'></Redirect>;
}
export default Portal;