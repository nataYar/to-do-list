import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Signin.css';
import  Particles  from './Particles';
import { auth } from '../../firebase';
import { facebook, git, google } from '../../auth/auth';

// import firebase from '../firebase';
function Signin (props) {
    // const [user, setUser] = useState('');

//    useEffect(() => {
//     MouseEffect()
//    }, [])

    return (
        <main className="signInForm">
            <Particles />
            <h1 className="header">Hola,</h1>
            <h2 className="header">sign in with </h2>
            <div className="media-sign-in"> 
                <button className="signInBtn facebook" onClick={() => handleMediaLogin(facebook)}></button>
                <button className="signInBtn google" onClick={() => handleMediaLogin(google)}></button>
                <button className="signInBtn gitHub" onClick={() => handleMediaLogin(git)}></button>
            </div>
    </main>
    )
    
    async function handleMediaLogin(provider) {
        await auth
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result)
            props.history.push('/dashboard')
        })
        .catch((error) => {
            // Handle Errors here.
           console.log(error.message)
          });
    } 
}

export default Signin;