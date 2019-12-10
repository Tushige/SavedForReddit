import firebase from './firebase';

export function isAuthUser() {
    return firebase.auth().currentUser;
}