const express = require('express');
const passport = require('passport');
const { registerUser, userOrders, orderDetails, getUserDetails, updateUser } = require('../controllers/user');

//endpoint for register
const registerRouter = express.Router();
registerRouter.post('/', registerUser);

//end point for signin
const signinRouter = express.Router();
signinRouter.post('/', (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    
        if (!user) {
            return res.status(401).json ({ message: info.message, check: 'this is the error I am getting today' });
        }
        req.login(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ error: 'Login Error' });
            }
            return res.status(200).json({ user });
        });
    }) (req, res, next);
});

//end point for logging out
const logoutRouter = express.Router();
logoutRouter.post('/', (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }

        //Destroy the session
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
        
            // clear the cookie
            res.clearCookie('connect.id', { path: '/' });

            res.status(200).json({ message: 'Logged out' });
        });
    });
});

//end point for user orders
const orderRouter = express.Router();
//end point for user purchase history
orderRouter.get('/:userId', userOrders);
//end point for details on a single order
orderRouter.get('/:orderId', orderDetails);

// end point for customer details
const userRouter = express.Router();
//end point for user details
userRouter.get('/:userId', getUserDetails);
//end point for updating user details
userRouter.put(`/:userId`, updateUser);

// exports
module.exports = {
    registerRouter,
    signinRouter,
    logoutRouter,
    orderRouter,
    userRouter
};

// const signinRouter = express.Router();
// signinRouter.post('/', 
//     passport.authenticate('local', { failureRedirect: '/api/users/signin' }),
//     (req, res) => {
//         res.status(200).redirect('/');
//     }
// );