'use strict';

// require the express module
var express = require('express');
// loads, and assigns public variable to it
var morgan = require('morgan');
var bodyParser = require('body-parser');
// 
var app = express();
// invoke the function, it creates a new express application
// a web service

/** .use 
// next is a function, called for processing the request to continue
app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    // req.method = GET or PUT etc
    // log method and url
    
    // continue processing request
    //express is maintaining middleware functions, 
    // app.use/app.get, express has an array of function pointers
    // function pointers added to the array in the same order we add to the app
    // if that function calls next, it goes to the next function in the function change until some function doesn't call next
    next();
    // next function in the chain, app.get scoped to particular method and url
    // if it's relevant, it doesn't
    
    // add as many middleware functions, one kind as a logger to do something
});
*/

app.use(morgan('dev'));
// parse JSON post bodies
// registered middle ware function that parse any post body that happens tobe in JSON format

// any  middleware functino executed after body parser
// has access to req.body as fully parsed 
app.use(bodyParser.json());

// serve static files from /static
// __dirname just exists, always set to full path of script that was executed
app.use(express.static(__dirname + '/static'));
/*
// call this function for GET on /
app.get('/', function(req, res) {
   // whenever someone requests root resource, call this
   res.setHeader('Content-Type', 'text/plain');
   res.send("Hello World!"); 
});


// call this function for GET on time
app.get('/time', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    // tells the browser it's not html
    res.send(new Date());
});
*/

app.get('/api/v1/users', function(req, res) {
    var users = [
        {
            email: 'test@test.com',
            displayName: 'Test User'
        }
    ];
    
    res.json(users);
    // any object/array you pass in, express serialize into json and
    // pop it back to the client
});

// inserting, post to users is adding a new useer

app.post('/api/v1/users', function(req, res) {
    console.log(req.body);
    // parsed up real javascript object
    res.json({message: 'new user created'});
});


// tsd install express --save 
// installs typing information

app.listen(80, function() {
    console.log("server is listening");
});