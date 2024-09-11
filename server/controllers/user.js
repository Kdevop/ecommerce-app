const bcrypt = require('bcrypt');
const Queries = require('../db/queries');
const passport = require('passport');

const userQuerySchema = { name: 'user', userDetails: ''};
const ordersQuerySchema = { name: 'orders', userDetails: '' };

const userQueries = new Queries(userQuerySchema);
const ordersQueries = new Queries(ordersQuerySchema);

const registerUser = async (req, res) => {
    
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return re.test(String(email).toLowerCase());
    };

    const { password, email, first_name, last_name } = req.body;
    
    console.log(password, email, first_name, last_name);
    

    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format at controllers checks' });
    }

    //Input validation
    if (!password || !email || !first_name || !last_name) {
        return res.status(400).json({ success: false, message: 'All fields are required - failed at user.js' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userDetails = { hashedPassword, email, first_name, last_name };
        
        const registerQuerySchema = { name: 'register', userDetails };
        const registerQueries = new Queries(registerQuerySchema);

        const data = await registerQueries.registerUser(userDetails);

        console.log(data);

        if (!data.error) {
            req.session.user = data.data;
            req.session.authenticated = true;

            res.status(200).json({ success: true, message: 'You are successfully registered!' });
            
        } else {
            res.status(400).json({ success: false, message: data.message });
            
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred during registration.' });
    }
};

const userOrders = async (req, res) => {
    const { userId } = req.params;

    if(req.user === userId) {
        try {
            const result = await ordersQueries.ordersOverview(userId);
            if(result.length === 0) {
                res.status(404).json({ success: true, message: 'No previous order', data: 0 });
            } else {
                res.status(200).json({ success: true, message: 'Customer orders returned', data: result.data });
            }
        } catch (error) {
            console.error('Error getting customer orders: ', error);
        }
    } else {
        res.status(401).json({ success: false, message: 'Please login.' })
    }
};

const orderDetails = async (req, res) => {
    const { orderId } = req.params;
    try {
        const result = await ordersQueries.orderIdDetails(orderId);
        if (result.error) {
            res.status(400).json({ success: false, message: result,message });
        } else {
            res.status(200).json({ success: true, message: 'Order details returned', result: result.data });
        }
    } catch (error) {
        console.error('Error getting customer order details: ', error);
        res.status(500).json({ success: false, message: 'Error getting customer order details', error });
    }
};

const getUserDetails = async (req, res) => {
    const { userId } = req.params;
    if (req.user === userId) {
        try {
            const userConf = userId;
            userQueries.userConf = userConf;

            const userData = await userQueries.customerDetails();

            if(!userData.error) {
                res.status(200).json({ success: true, message: 'User Details returned', data: userData.rows[0] });
            } else {
                res.status(400).json({ success: false, message: userData.message });
            }
        } catch (error) {
            console.error('Error collecting user details: ', error);
            res.status(500).send({ success: false, message: 'An error occured collecting your details' });
        }
    } else {
        res.status(401).json({ message: 'Please login.' });
    }
};

const updateUser = async (req, res) => {
    const [ userId ] = req.params;

    if(req.user === userId) {
        try {
            const userDetails = { ...req.body, userId };
            const result = await userQueries.updateUserDetails(userDetails);
            res.status(200).json({ success: true, message: 'User details updated successfully', data: result });
        } catch (error) {
            console.error('Error updating user details: ', error);
            res.status(500).json({ success: false, message: 'Error updating user details', error: error.message });
        }
    } else {
        res.status(401).json({ success: false, message: 'Please login.' });
    }
}

module.exports = {
    registerUser,
    userOrders,
    orderDetails,
    getUserDetails,
    updateUser,
};
