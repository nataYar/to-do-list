import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase, { auth } from '/Users/nataliayarysheva/projects/toDoList/src/firebase.js';
// import firebase from '../firebase';
function Login (props) {
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    

    return (
        <main>
          <form onSubmit={handleLogin}>
            <h1 className="header">Welcome back! Log in, please</h1>
            <input className="inputBox" placeholder="enter your email" type="text"  
            value={email} onChange = {e => setEmail(e.target.value)}required/>

            <input className="inputBox" placeholder="enter your password" type="password" minLength="6" 
            value={password} onChange = {e => setPassword(e.target.value)}required/>

            <button className="SLButton" type="submit">Log in</button>
            
            <Link to="/register">Register</Link>
          </form>
      </main>
    )

    async function handleLogin(e) {
        e.preventDefault();
       try {
           await auth
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user= userCredential.user;
            })
            props.history.push('/dashboard')
       } catch (error){
           console.log(error)}
        }
}

export default Login;