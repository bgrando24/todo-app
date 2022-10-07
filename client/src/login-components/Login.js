import React, { Fragment, useEffect, useState } from "react";
import { checkLogin } from "../Utilities";

export function Login() {

    // state to control storing the user's inputs for email and password used for login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State to hold the login failed message
    const [loginError, setLoginError] = useState('');


    // Checks if the user is already logged in or mounting of the login page
    useEffect(() => {
        handleCheckLogin();
    }, []);


    // Handles checking if the user is already logged in, currently in testing
    const handleCheckLogin = async() => {
        try {
            
            const response = await checkLogin('http://localhost:5000/login');

            if (await response.status == "ok") {
                console.log(response.session.user);
                window.location = '/todos';
            } else {
                console.log(response);
                console.log("Session not found");
                }
            } catch (e) {

            console.error(e.message);
        }
    }

    // handles sending the login once form is submitted
    const handleSubmitLogin = async (event) => {
        
        event.preventDefault();

        // deconstructiong body object ot send with request (stores the user login data)
        const body = {email, password};
        
        try {
            
            const loginRequest = await fetch('http://localhost:5000/login', {
                method: "POST",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const response = await loginRequest.json();
            console.log(response);
            
            // if it's 'ok', login was successful
            if (response.status == "ok") {
                window.location = '/todos';
            }

        setLoginError(response.message);

        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="d-flex-column"> 

            <h1 className="text-center mt-5">Login</h1>

            <p className="alert alert-danger text-center" style={{visibility: loginError ? 'visible': 'hidden'}}>{loginError}</p>

            <form className="d-flex-column" onSubmit={handleSubmitLogin}>
                <input
                    type='email' 
                    className="form-control mt-2" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    className="form-control mt-2" 
                    placeholder='Password' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />

                <div className="container d-flex flex-column justify-content-center">
                    <button className="btn btn-primary mt-5" type='submit'>Submit</button>

                    <div className="mx-auto">
                        <button className="btn btn-secondary mt-5" ><a className="text-light" href='/register'>Register</a></button>
                    </div>

                </div>

            </form>
            {/* <button className="btn btn-secondary" onClick={handleCheckLogin}>Check login</button> */}

        </div>
    )
}