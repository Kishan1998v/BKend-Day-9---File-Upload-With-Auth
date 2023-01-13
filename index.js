//Express Server
const express = require('express')
const app = express()
const PORT = 1234;

//Database
const { connectDB } = require('./config/db');


//Middlewares
app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({extended:true}));

//Listening to
app.listen(PORT, () => {
    console.log("server is started")
    //we are calling the connectDB when Server is ON
    connectDB();
})