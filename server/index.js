const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database');


// middleware
app.use(cors());

// Anytime we're building fullstack, we need to get data from client side
    // To get this data, we use the req.body object
app.use(express.json());    //this gives us access to req.body and the json data



// ###ROUTES### //

// Create a todo -> C
app.post("/todos", async (req, res) => {
    try {

        // Get data from client side to put into db -> use the req.body
        // req.body will send the JSON data we can use
        const {description} = req.body;
        // adds new todo AND returns all todos
        const newTodo = await pool.query(`INSERT INTO perntodo (description, status) VALUES (${description}, 'NEW') RETURNING *`);

        // return the new todo as JSON
        res.json(newTodo.rows[0]);

    } catch (e) {
        console.error(e.message);
    }
});


// get all todos -> R
app.get('/todos', async (req, res) => {
    try{

        const allTodos = await pool.query('SELECT * FROM perntodo');
        res.json(allTodos.rows);    //returns json array with all todos

    } catch(e) {
        console.error(e.message);
    }
})


// get a single todo -> R
app.get('/todos/:id', async(req, res) => {
    try {

        const singleTodo = await pool.query(`SELECT * FROM perntodo WHERE id = ${req.params.id}`);
        res.json(singleTodo.rows[0]);

    } catch (e) {
        console.error(e.message);
    }
})


// update a todo -> U
app.put('/todos/:id', async(req, res) => {
    try {

        const updatedTodo = await pool.query(`UPDATE perntodo SET description = ${req.body.description}, status = ${req.body.status} WHERE id = ${req.params.id}`);
        res.json("Todo was updated");

    } catch (e) {
        console.error(e.message);
    }
});


// delete a todo -> D
app.delete('/todos/:id', async(req, res) => {
    try {

        const deleteTodo = await pool.query(`DELETE FROM perntodo WHERE id=${req.params.id}`);
        res.json("Todo was deleted");

    } catch (e) {
        console.error(e.message);
    }
});



app.listen(5000, () => {
    console.log("Server running on port 5000");
});