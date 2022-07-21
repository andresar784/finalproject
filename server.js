// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
const mainRouter = require('./server/routes/orders');
//ibHbgGHuh18nq4Rc mongo password
//mongodb+srv://andres:<password>@cluster0.fjqam.mongodb.net/?retryWrites=true&w=majority

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... 
mongoose.connect('mongodb+srv://andres:ibHbgGHuh18nq4Rc@cluster0.fjqam.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true }, (err, res) => {
        if (err) {
            console.log('Connection failed: ' + err);
        }
        else {
            console.log('Connected to the database!');
        }
    }
);

const app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Content-Type', 'application/json');
     next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/finalproject')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);





// ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
// app.use(function (req, res, next) {
//     res.render("/index");
// });


// Tell express to map all other non-defined routes back to the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/finalproject/index.html'));
});

app.set('view-engine', 'index.html')

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
    console.log('API running on localhost: ' + port)
});