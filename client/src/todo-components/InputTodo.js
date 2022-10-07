import React, { Fragment, useEffect, useState } from "react";


/*
    Note that the deconstructed user object is received from the Todos component.
    The Todos component checks the user is logged in before providing access.
    If logged in, provides access and passes the user details through a prop to here.
*/

export function InputTodo({ user }) {

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('NEW');

    // handles submitting the form (new todo) 
    const handleSubmitForm = async (e) => {

        // preventDefault stops it from refreshing on submission
        e.preventDefault();

        try {

            const body = {description, status, user};
            const response = await fetch('http://localhost:5000/todos', {
                // http method
                method: "POST",
                // specifies the type of data
                headers: {"Content-Type": "application/json"},
                // converts body JS object (from above) to JSON object, and sends in the req.body object
                body: JSON.stringify(body)
            });

            // once new todo is sent, refresh to show updated todo list
            window.location = "/todos";

        } catch (e) {
            console.error(e.message);
        }
    }

    useEffect(() => {
        caclulateExpiry(user.expiry);
    });

    // for debugging - cacluates how long user has until session expires
    const caclulateExpiry = (expiryEnd) => {
        let currentTime = new Date();
        let expireTime = new Date(expiryEnd);
        let minutes = (expireTime - currentTime) / (1000 * 60);
        console.log(minutes);
        return Math.round(minutes * 10) / 10;
    }


    return (
        <Fragment>
            <h1 className="text-center mt-5">Welcome {user.name}</h1>
            <h2 className="text-center mt-3">Expiry: {caclulateExpiry(user.expiry)} minutes</h2>
            <form className="d-flex flex-column mt-5" onSubmit={handleSubmitForm}>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} placeholder="Add a new todo..."/>

                <div className="dropdown mt-2 mx-auto">
                            <select className="text-center" name="status" value={status} onChange={e => setStatus(e.target.value)}>
                                <option 
                                    value="NEW">
                                    New
                                </option>
                                <option 
                                    value="ACKNOWLEDGED">
                                    Acknowledged
                                </option>
                                <option
                                    value="IN PROGRESS">
                                    In Progress
                                </option>
                                <option
                                    value="COMPLETED">
                                    Completed
                                </option>
                            </select>
                        </div>

                <button className="btn btn-success mt-2 mx-auto px-5">Add</button>
            </form>
        </Fragment>
    )
}

