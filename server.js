// There are 3 types of middleware in express.js.PORT
// the three types of middleware are:
// 1. Built-in middleware
// 2. Third-party middleware
// 3. Custom middleware

// Built-in middleware is provided by express.js itself and is used to handle common tasks such as serving static files, parsing request bodies, and handling cookies.
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const {errorHandler} = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

// Connect to MongoDB
connectDB();

// define a Port
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);



// app.use(cors()); // Cross Origin Resource Sharing

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data that is submitted via a form with the "application/x-www-form-urlencoded" content type.   
app.use(express.urlencoded({ extended: false}));

// built-in middleware to handle json data
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use('/', express.static(path.join(__dirname, 'public')));


// Routes 
app.use('/register', require('./Routes/register'));
app.use('/auth', require('./Routes/auth'));
app.use('/', require('./Routes/root'));
app.use('/refresh', require('./Routes/refresh'));
app.use('/logout', require('./Routes/logout'));

app.use(verifyJWT); // Verify JWT for all routes below this line
app.use('/employees', require('./Routes/api/employees'));


// // Default route handler for 404
// app.get('{*splat}', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// })

app.all('{*splat}', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({error: "404 Not Found"});
    }
    else{
        res.type('txt').send("404 Not Found");
    }
})

app.use(errorHandler);

// listen to the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
})
