import firebase from '../config/firebase-config';

const socialMediaAuth = (provider) => {
    return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        return result.user;
        // ...
    }).catch((error) => {
       return error;
    });
};

export default socialMediaAuth; 