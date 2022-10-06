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




// MIDDLEWARE SECTION //
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "PUT", "POST", "DELETE", "HEAD", "OPTIONS"],
    credentials: true
}));

// middleware specific to passport auth
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const tenSec = 1000 * 10;

// session
app.use(expressSession({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true, secure: false, maxAge: tenSec}
}));

app.use(cookieParser("secretcode"));    //note same 'secret' value found in express session



// USING EXPRESS SESSION ARTICLE
// https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/







// ###LOGIN ROUTES###
// test_users (id (serial), name, email, password)


// Handles checking if the user is already logged in via an existing session
app.get('/login', (req ,res) => {
    // Checking if user is already logged in via session
    try {
            if (req.session.user.id) {
            console.log("User already logged in, redirecting...");
            res.json({status: "ok", message: "User logged in"});
            } 

    } catch (e) {

        console.error(e.message);
         res.json({status: "fail", message: "User NOT logged in"});
    }
    
});

// handles logging in
app.post('/login', async (req, res) => {

    const {email, password} = req.body;
    console.log(`Login attempt for email ${email} and password ${password}`);

    try {
        
        const loginQuery = await pool.query(`SELECT * FROM test_users WHERE email ='${email}'`);

        if (!loginQuery.rows[0]) {
            res.json({status: "fail", message: "Email not found"});
        }

        // Compares the provided login password and the hashed pw from the database
        // 'res' is the outcome of the comparison, boolean value
        await bcrypt.compare(password, loginQuery.rows[0].password, (err, result) => {
            if (err) {
                console.error(err.message);
            }

            // Passwords match
            if (result) {
                console.log("Login successful");

                // express session 
                // user object for the session
                const sessionUser = {
                    id: loginQuery.rows[0].id,
                    name: loginQuery.rows[0].name,
                    email: loginQuery.rows[0].email
                };

                console.log("Setting user session");
                req.session.user = sessionUser;
                console.log(req.session);

                res.json({status: "ok"});

            // Passwords do not match
            } else {
                console.log("Login failed: Password not recognised by bcrypt");
                res.json({status: "fail", message: "Password not recognised"});
            }
        });

    } catch (e) {
        console.error(e.message);
    }
});


// handles registering a user
app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    console.log(`Received POST request for new user\nName: ${name}\nEmail: ${email}\nPassword: ${password}`);

    try {
        //using bcrypt to hash the password -> 10 rounds of encrypting
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const registerQuery = await pool.query(`INSERT INTO test_users (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`);


        // tells client was successful
        res.json({status: "ok"});

    } catch (e) {
        console.error(e.message);
    }
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