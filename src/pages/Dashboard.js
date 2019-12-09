import React from 'react'
import ReactDOM from 'react-dom';
import firebase from '../utils/firebase';

function Dashboard() {
    function signOut() {
        firebase.auth().signOut().then(() => {
            console.log('sign out success!')
        }).catch(e => console.error(e))
    }
    return (
        <>
            <div>Dashboard</div>
            <button onClick={signOut}>Sign out</button>
        </>
    )
}

export default Dashboard;