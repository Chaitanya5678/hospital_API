//Importing express and firing up the server
const express = require('express');
const port = 8000;
const app = express();

// Import MongoDB set up through mongoose
const db = require('./config/mongoose');

//Import passport and passport-jwt strategy set up
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

//Middleware that parses incoming requests with JSON payloads
app.use(express.urlencoded());

//Initialize passport
app.use(passport.initialize());

//Set up routes folder
app.use('/',require('./routes'));

//Listening to server on specified port
app.listen(port, function(err){

    if(err)
    {
        console.log('Error in firing up server ', err);
        return;
    }

    console.log('Server is Up and running on port : ', port);
});