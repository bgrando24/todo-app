import React, { Fragment, useEffect, useState } from "react";
import { EditTodo } from "./EditTodo";

export function ListTodos({ user }) {

    // component state for storing fetched todos
    const [todos, setTodos] = useState([]);

    // State for controlling list refresh
    const [refreshList, setRefreshList] = useState(false);
    useEffect(() => {
        if (refreshList) {
            getTodos();
            setRefreshList(false);
        }
    });

    // handles fetching the todos
    // 'fetch()' defaults to GET requests so don't need to specify options
    const getTodos = async() => {
        try {

            const body = {user};

            const response = await fetch('http://localhost:5000/user-todos', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

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

        {todos.length == 0 ? <p className="text-center mt-4">There seems to be nothing here!</p> :

            <div className="my-4 pb-5">
                {
                    todos.map( todo => {
                        return (
                            <div className="container mx-auto my-3 border rounded">

                                <div className="d-flex">
                                    
                                    <div className="d-flex flex-wrap justify-content-around mt-2 w-50">

                                        <div className="d-flex flex-column align-items-center w-75">
                                            <h6 className="font-weight-bold">Description</h6>
                                            <p>{todo.description}</p>
                                        </div>

                                        <div className="d-flex flex-column align-items-center">
                                            <h6 className="font-weight-bold">Status</h6>
                                            <p>{todoStatusString(todo.status)}</p>
                                        </div>

                                    </div>

                                    <div className="d-flex justify-content-around align-items-center w-50">
                                    <EditTodo todo={todo} setRefreshList={setRefreshList}/>
                                    
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => handleDeleteTodo(todo.id)} >
                                            Delete
                                    </button>

                                    </div>

                                </div>
                                
                            </div>
                        )
                    })
                }
            </div>            

        }
        </Fragment>
    )
}




// {/* <table className="table mt-5 text-center">
//                 <thead>

//                 {/* Table headings */}
//                 <tr>
//                     <th>Description</th>
//                     <th>Status</th>
//                     <th>User</th>
//                     <th>User ID</th>
//                     <th>Edit</th>
//                     <th>Delete</th>
//                 </tr>
//                 </thead>

//                 <tbody>
//                 {/* FOR REFERENCE ONLY */}
//                 {/* <tr>
//                     <td>Mary</td>
//                     <td>Moe</td>
//                     <td>mary@example.com</td>
//                 </tr> */}


//                 {/* Table elements */}
//                 {todos.map(todo => {
//                     return (
//                         <tr id={todo.id} key={todo.id}>
//                             <td>{todo.description}</td>
//                             <td>{todoStatusString(todo.status)}</td>
//                             <td>{todo.username}</td>
//                             <td>{todo.userid}</td>
//                             {/* 'edit' and 'delete' will eventually be buttons, are table data for mapping out data */}
//                             <td>
//                                 <EditTodo todo={todo} setRefreshList={setRefreshList}/>
//                             </td>
//                             <td>
//                                 <button 
//                                     className="btn btn-danger" 
//                                     onClick={() => handleDeleteTodo(todo.id)} >
//                                         Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     )
//                 })}
//                 </tbody>
//             </table> */}