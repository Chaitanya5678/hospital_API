const express = require('express');

const port = 8080;

const app = express();

const db = require('./config/mongoose');

const passport = require('passport');

const passportJWT = require('./config/passport-jwt-strategy');

app.use(express.urlencoded());

app.use(passport.initialize());

app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err)
    {
        console.log('Error in firing up server ', err);
        return;
    }

    console.log('Server is Up and running on port : ', port);
});