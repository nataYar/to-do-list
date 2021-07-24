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
            {/* <form className="signInForm"> */}
            
            <h1 className="header">Hola, sign in with </h1>
                {/* <input className="inputBox" placeholder="enter your email" type="text"  
                value={email} onChange = {e => setEmail(e.target.value)}required/>
                <input className="inputBox" placeholder="enter your password" type="password" minLength="6" 
                value={password} onChange = {e => setPassword(e.target.value)}required/> */}
                {/* <button className="SLButton" type="submit">Log in</button> */}
            <div className="media-sign-in"> 
                <button className="signInBtn facebook" onClick={() => handleMediaLogin(facebook)}></button>
                <button className="signInBtn google" onClick={() => handleMediaLogin(google)}></button>
                <button className="signInBtn gitHub" onClick={() => handleMediaLogin(git)}></button>
                </div>
                
          {/* </form> */}
    </main>
    )
    
    async function handleMediaLogin(provider) {
        
        await auth
        .signInWithPopup(provider)
        .then((result) => {
            // The signed-in user info.
            // const user = result.user.uid;
            // setUser(user)
            console.log(result)
            props.history.push('/dashboard')
        })
        .catch((error) => {
            // Handle Errors here.
           console.log(error.message)
          });
    } 
    // async function handleLogin(e) {
    //    e.preventDefault();
    //    try {
    //        await auth
    //         .signInWithEmailAndPassword(email, password)
    //         .then((userCredential) => {
    //             const user = userCredential.user ;
    //             props.history.push('/dashboard')
    //         })
            
            
    //    } catch (error){
    //        console.log(error)}
    //     }
}

export default Signin;