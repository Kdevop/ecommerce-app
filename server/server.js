// set up imports
const express = require('express');
require('dotenv').config();
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');

//route imports


//server setup
const app = express();
app.use(cors());
app.use(helmet());
const { PORT } =require('./config');
const port = PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route for users


//route for products


//route for cart


//app.listen
app.listen(port, () => {
    console.log(`Your server is listening on port: ${port}`);
});
