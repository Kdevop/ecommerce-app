const express = require('express');
const passport = require('passport');
const { registerUser, userOrders, orderDetails, getUserDetails, updateUser } = require('../controllers/user');

//endpoint for register
const registerRouter = express.Router();
registerRouter.post('/', registerUser);

//end point for signin
const signinRouter = express.Router();
signinRouter.post('/', 
    passport.authenticate('local', { failureRedirect: '/api/users/signin' }),
    (req, res) => {
        res.status(200).redirect('../');
    }
);

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

