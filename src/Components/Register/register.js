import React, { useState } from 'react';
import { Link } from "react-router-dom";
import firebase, { auth } from '/Users/nataliayarysheva/projects/toDoList/src/firebase.js';


function Register (props) {
    
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

    return (
        <main>
          <form onSubmit={handleSubmit}>
            <h1 className="header">New user? Register, please</h1>
            
            <input className="inputBox" placeholder="enter your email" type="text"  
            value={email} onChange = {e => setEmail(e.target.value)} required/>

            <input className="inputBox" placeholder="enter your password" type="password" minLength="6" 
            value={password} onChange = {e => setPassword(e.target.value)} required/>

            <button className="SLButton" type="submit"
            >Register</button>

            <Link to="/">Log in</Link>
          </form>
      </main>
    )

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                props.history.push("/dashboard");    
        });
        } catch (error) {
            console.log(error);
    }
}}

export default Register;