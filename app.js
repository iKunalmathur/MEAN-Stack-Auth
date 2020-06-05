const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database, { useNewUrlParser: true , useUnifiedTopology:true});
//On CONNECTED
mongoose.connection.on('connected', ()=>{
    console.log("Connected To database "+config.database);
});

// On ERROR
mongoose.connection.on('error', (error)=>{
    console.log("Database Error: " +error);
});


const app = express();

const users= require('./routes/users')
//Port No.
const port = 3000;

//CORS MiddleWare
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname,'public')));

//Body-parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/users',users);


//Index Route
app.get('/',(req,res)=>{
    res.send('Invalid EndPoint');
});

//Start Server
app.listen(port,()=>{
    console.log("Server Started on port "+port);
});



