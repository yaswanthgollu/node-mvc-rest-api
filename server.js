// There are 3 types of middleware in express.js.PORT
// the three types of middleware are:
// 1. Built-in middleware
// 2. Third-party middleware
// 3. Custom middleware

// Built-in middleware is provided by express.js itself and is used to handle common tasks such as serving static files, parsing request bodies, and handling cookies.

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const {errorHandler} = require('./middleware/errorHandler');


// define a Port
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);


// app.use(cors()); // Cross Origin Resource Sharing

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data that is submitted via a form with the "application/x-www-form-urlencoded" content type.   
app.use(express.urlencoded({ extended: false}));

// built-in middleware to handle json data
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, 'public')));


// Routes 
app.use('/', require('./Routes/root'));
app.use('/register', require('./Routes/register'));
app.use('/employees', require('./Routes/api/employees'));
app.use('/auth', require('./Routes/auth'));

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
app.listen(PORT, () => console.log('Server running on port ' + PORT));

