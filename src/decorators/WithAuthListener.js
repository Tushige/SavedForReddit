import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import { useHistory } from "react-router-dom";

function WithAuthListener({children}) {
    let history = useHistory();
    useEffect(() => {
        // listen to auth status change
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                history.push('/dashboard');
            } else {
                firebase.auth().signOut();
            }
        });
        return function cleanup() {
            unsubscribe();
        }
    }, [])

    return (
        <>
            {children}
        </>
    );
  }

export default WithAuthListener;