import firebase from '/Users/nataliayarysheva/Projects/toDoList/src/firebase.js';

export const facebook = new firebase.auth.FacebookAuthProvider();
export const google = new firebase.auth.GoogleAuthProvider();
export const git = new firebase.auth.GithubAuthProvider();