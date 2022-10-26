import React, { Fragment, useState } from "react";

export function EditTodo( {todo, setRefreshList} ) {

    // State used to view and change the description and status of the Todo we are editing
    const [description, setDescription] = useState(todo.description);
    const [status, setStatus] = useState(todo.status);


    // Handles sending a PUT request to edit the todo -> called by the 'Edit' button in the modal
    const handleEditTodo = async (event) => {

        event.preventDefault();

        try {
            // package the updated data into body object
            const body = {description, status};
            
            const updateRequest = await fetch(`http://localhost:5000/todos/${todo.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            }) 

            console.log(updateRequest);

            // trigger list refresh
            setRefreshList(true);

        } catch (e) {
            console.error(e.message);
        }
    }



    return (
        <Fragment>
            {/* From W# Schools ->  https://www.w3schools.com/bootstrap4/bootstrap_modal.asp*/}

            {/* The data-target attrribute takes the current todo's ID and targets the appropriate description
                by making the modal itself have the same unique id (via the todo's id) */}

            <button 
                type="button" 
                className="btn btn-primary" 
                data-toggle="modal" 
                data-target={`#id${todo.id}`}>
                Edit
            </button>

            <div className="modal fade" id={`id${todo.id}`} >
                <div className="modal-dialog">
                    <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todo</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
                            &times; 
                        </button>
                    </div>

                    <div className="modal-body">
                        Description
                        <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                        
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

                    </div>

                    <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => handleEditTodo(e)}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
                            Close
                        </button>
                    </div>

                    </div>
                </div>
            </div>

        </Fragment>
    );
}