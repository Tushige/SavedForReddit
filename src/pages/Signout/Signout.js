import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../../utils/auth';
import firebase from '../../utils/firebase';

function Signout(props) {
  firebase.auth().signOut().then(() => {
    localStorage.setItem('access_token', null);
    localStorage.setItem('code', null);
    console.log('sign out success!')
  }).catch(e => console.error(e))
  return <Redirect to='/'></Redirect>;
}

export default Signout;
