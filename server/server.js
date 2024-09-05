// set up imports
const express = require('express');
require('dotenv').config();
const passport = require('passport');
const initializePassport = require('./controllers/auth.js');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const { DB, SS } =require('./config');

//route imports
const { registerRouter, signinRouter, logoutRouter, orderRouter, userRouter } = require('./routes/userRoute.js');
const { productRouter } = require('./routes/productRoute.js');
const { cartRouter } = require('./routes/cartRoute.js');

//server setup
const app = express();

// Used for testing to make sure server / express app is running.
app.get('/', (req, res, next) => {
    res.send('<h1>Hello Kiernan</h1>');
});

app.use(cors());
app.use(helmet());
const pgSession = require('connect-pg-simple')(session);
const { PORT } =require('./config');
const port = PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const options = {
    user: DB.DB_USER, 
    host: DB.DB_HOST,
    database: DB.DB_DATABASE,
    password: DB.DB_PASSWORD,
    port: DB.DB_PORT,
    createDatabaseTable: true,
    createTableIfMissing: true
};

console.log(options); //After testing this line can be deleted.

const sessionStore = new pgSession(options);

app.use(session({
    name: SS.SS_SESS_NAME,
    resave: false, 
    saveUninitialized: false, 
    store: sessionStore,
    secret: SS.SS_SESS_SECRET,
    cookie: {
        maxAge: Number(SS.SS_SESS_LIFETIME),
        sameSite: true, 
        secure: false, //change to true once in build? Will only set a cookie if the browser is https - we can enforce this in the build?
    } 
}));

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

//route for users
app.use('/api/users/register', registerRouter);
app.use('/api/users/signin', signinRouter);
app.use('/api/users/logout', logoutRouter);
app.use('/api/users/orders', orderRouter);
app.use('/api/users/details', userRouter);

//route for products
app.use('/api/products', productRouter);

//route for cart
app.use('/api/cart', cartRouter)

//app.listen
app.listen(port, () => {
    console.log(`Your server is listening on port: ${port}`);
});
