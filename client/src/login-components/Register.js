import React, { Fragment, useState } from "react";

export function Register() {

    // state to control storing the user's inputs for name, email and password
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // handles sending the registration data once form is submitted
    const handleSubmitRegistration = async (event) => {

        // deconstructiong body object ot send with request (stores the user registration data)
        const body = {name, email, password};
        
        event.preventDefault();
        
        try {
            
            const registrationRequest = await fetch('http://localhost:5000/register', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const response = await registrationRequest.json();
            console.log(response);
            
            if (response.status == "ok") {
                window.location = '/login';
            }

        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="d-flex-column"> 

            <h1 className="text-center mt-5">Register</h1>

            <form className="d-flex-column" onSubmit={handleSubmitRegistration}>
                <input 
                    className="form-control mt-2" 
                    placeholder="Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                />
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

                <button type='submit'>Submit</button>
            </form>

            <a href='/login'>Login</a>

        </div>
    )
}