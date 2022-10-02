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


// get a single todo -> R


// update a todo -> U


// delete a todo -> D



app.listen(5000, () => {
    console.log("Server running on port 5000");
});