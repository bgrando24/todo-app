import React, { Fragment, useState } from "react";
import { useReducedMotion } from "react-spring";

export function InputTodo({ user }) {

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('NEW');

    // handles submitting the form (new todo) 
    const handleSubmitForm = async (e) => {

        // preventDefault stops it from refreshing on submission
        e.preventDefault();

        try {

            const body = {description, status};
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

    return (
        <Fragment>
            <h1 className="text-center mt-5">Welcome {user.name}</h1>
            <form className="d-flex mt-5" onSubmit={handleSubmitForm}>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} placeholder="Add a new todo..."/>

                <div className="dropdown mt-2">
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

                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

