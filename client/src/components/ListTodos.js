import React, { Fragment, useEffect, useState } from "react";

export function ListTodos() {

    // component state for storing fetched todos
    const [todos, setTodos] = useState([]);

    // handles fetching the todos
    // 'fetch()' defaults to GET requests so don't need to specify options
    const getTodos = async() => {
        try {

            const response = await fetch('http://localhost:5000/todos');

            // We receive JSON data back, need to handle it
            const jsonData = await response.json();   //parsing JSON, need await

            // Once parsed JSON data is in an array, adding it to state
            setTodos(jsonData);

            console.log(jsonData);

        } catch (e) {
            console.error(e.message);
        }
    }


    // Handles deleting a todo by using the ID value
    const handleDeleteTodo = async (id) => {
        try {

            const deleteRequest = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            //removes the todo that has been deleted, rather than refrshing whole page
            setTodos(todos.filter(todo => todo.id !== id));
            
        } catch (e) {
            console.error(e.message);
        }
    }



    // Converts the 'status' of the todo to an appropriate string for display
    const todoStatusString = (rawString) => {
        let convertedString = "";

        switch (rawString) {
            case "NEW":
                convertedString += "New";
                break;

            case "ACKNOWLEDGED":
                convertedString += "Acknowledged";
                break;

            case "IN PROGRESS":
                convertedString += "In Progress";
                break;

            case "COMPLETED":
                convertedString += "Completed";
                break;
        
            default:
                convertedString += rawString;
                break;
        }

        return convertedString;
    }

    // fetches all todos only on mounting component
    useEffect( () => {
        getTodos();
    }, []);


    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>

                {/* Table headings */}
                <tr>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>

                <tbody>
                {/* FOR REFERENCE ONLY */}
                {/* <tr>
                    <td>Mary</td>
                    <td>Moe</td>
                    <td>mary@example.com</td>
                </tr> */}


                {/* Table elements */}
                {todos.map(todo => {
                    return (
                        <tr id={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todoStatusString(todo.status)}</td>
                            {/* 'edit' and 'delete' will eventually be buttons, are table data for mapping out data */}
                            <td>Edit</td>
                            <td><button className="btn btn-danger" onClick={() => handleDeleteTodo(todo.id)} >Delete</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Fragment>
    )
}