import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Signin.css';
import  MouseEffect  from './MouseEffect';
import { auth } from '../../firebase';
import { facebook, git, google } from '../../auth/auth';

// import firebase from '../firebase';
function Signin (props) {
    const [user, setUser] = useState('');
    
   useEffect(() => {
    MouseEffect()
   }, [])

    return (
        <main className="signInForm">
            <canvas id="signInCanva" ></canvas>
            <h1 className="header">Hola, sign in with </h1>
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