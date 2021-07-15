import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Signin.css';
import  MouseEffect  from './MouseEffect';
import firebase, { auth } from '../../firebase';
import { socialMediaAuth, facebook, git, google } from '../../auth/auth';

// import firebase from '../firebase';
function SignIn (props) {
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    
   useEffect(() => {
    MouseEffect();
   }, [])

    return (
        <main className="signInBackground">
            <canvas id="signInCanva" ></canvas>
            <form className="signInForm" onSubmit={handleLogin}>
                <h1 className="header">Welcome back! Log in, please</h1>
                <input className="inputBox" placeholder="enter your email" type="text"  
                value={email} onChange = {e => setEmail(e.target.value)}required/>

                <input className="inputBox" placeholder="enter your password" type="password" minLength="6" 
                value={password} onChange = {e => setPassword(e.target.value)}required/>

                <button className="SLButton" type="submit">Log in</button>
                <div className="media-sign-in"> Log in with
                    <button onClick={() => handleMediaLogin(facebook)}>Facebook</button>
                    <button onClick={() => handleMediaLogin(google)}>Google</button>
                    <button onClick={() => handleMediaLogin(git)}>GitHub</button>
                    </div>
                
                <Link to="/register">Register</Link>
          </form>

        
          
    </main>
    )
    
    async function handleMediaLogin (provider) {
        firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user.email;
            setEmail(user);
            console.log(email)
            props.history.push('/dashboard', [email])
        })
        
        .catch((error) => {
            // Handle Errors here.
           console.log(error.message)
          });
    } 
    
    async function handleLogin(e) {
       e.preventDefault();
       try {
           await auth
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user ;
                props.history.push('/dashboard')
            })
            
            
       } catch (error){
           console.log(error)}
        }
}

export default SignIn;