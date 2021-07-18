const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const phoneBookRoute = require('./routes/Phonebook');
require('dotenv').config;


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('tiny'));
require('./DB')();

//Middleware for user
const authRoute = require('./routes/auth');
app.use('/api/user', authRoute);

app.get('/',(req,res)=>{
    res.send("Hello World.");
})

//Middleware for Phonebook
app.use('/phone', phoneBookRoute);

app.listen(port, ()=>{
    console.log("Connected to port ",port );
});