//Import mongoose and make a database connection

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hospitalAPI_development');

const db = mongoose.connection;

// Log error/success messages on console 

db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;