const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database');

// authenitcation with passport -> https://www.youtube.com/watch?v=IUw_TgRhTBE
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser'); //For parsing cookies we use for session
const bcrypt = require('bcryptjs'); //hashes the user passwords
const expressSession = require('express-session'); //sessions for persistant login
const bodyParser = require('body-parser');



// Anytime we're building fullstack, we need to get data from client side
    // To get this data, we use the req.body object
app.use(express.json());    //this gives us access to req.body and the json data



// middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// middleware specific to passport auth
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// session
app.use(expressSession({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser("secretcode"));    //note same 'secret' value found in express session




// ###LOGIN ROUTES###
// test_users (id (serial), name, email, password)

// handles logging in
app.post('/login', (req, res) => {
    console.log(req.body);
});


// handles registering a user
app.post('/register', (req, res) => {
    console.log(req.body);
});


// handles getting user info
app.get('/user', (req, res) => {
    console.log(req.body);
});







// ###TODOS ROUTES### //

// test route
app.get('/', (req, res) => {
    res.send("Hello!");
});

// Create a todo -> C
app.post("/todos", async (req, res) => {
    try {

        // Get data from client side to put into db -> use the req.body
        // req.body will send the JSON data we can use
        const {description, status} = req.body;

        // adds new todo AND returns all todos
        const newTodo = await pool.query(`INSERT INTO perntodo (description, status) VALUES ('${description}', '${status}') RETURNING *`);

        // Logging outcome
        console.log(`Added new todo to database: "${description}"\nStatus: ${status}`);

        // return the new todo as JSON
        res.json(newTodo.rows[0]);

    } catch (e) {
        console.error(e.message);
    }
});


// get all todos -> R
app.get('/todos', async (req, res) => {
    try{

        const allTodos = await pool.query('SELECT * FROM perntodo ORDER BY id ASC');
        res.json(allTodos.rows);    //returns json array with all todos
        console.log('All todos queried');

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
        const {description, status} = req.body;

        const updatedTodo = await pool.query(`UPDATE perntodo SET description = '${description}', status = '${status}' WHERE id = ${req.params.id}`);
        res.json("Todo was updated");
        console.log(`Todo was updated to: "${description}"\nStatus: ${status}`);

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