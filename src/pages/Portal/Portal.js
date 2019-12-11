import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function Portal({ locaiton }) {
  if (location.search) {
    let query = new URLSearchParams(location.search);
    let code = query.get('code');
    localStorage.setItem('code', code);
  } else {
    return <Redirect to='/signout'></Redirect>;
  }
  return <Redirect to='/dashboard'></Redirect>;
}
export default Portal;