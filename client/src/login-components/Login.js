import React, { Fragment, useState } from "react";

export function Login() {

    // state to control storing the user's inputs for name, email and password
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // handles sending the login once form is submitted
    const handleSubmitLogin = async (event) => {
        
        event.preventDefault();
        
        try {
            
            console.log(`${name}, ${email}, ${password}`);

        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="d-flex-column"> 

            <h1 className="text-center mt-5">Login</h1>

            <form className="d-flex-column" onSubmit={handleSubmitLogin}>
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

        </div>
    )
}