const express = require('express');
const { openCart, getFromCart, addToCart, updateCart, deleteItem, checkout } = require('../controllers/cart');
const { isAuth } = require('../controllers/auth');

const cartRouter = express.Router();
//end point for getting details from a customer cart
cartRouter.get('/', isAuth, getFromCart); //might need to change this end point? 
//end point for opening a cart
cartRouter.post('/open', openCart); //might remove this as a route as not sure it will be needed?
//end point for adding product to cart
cartRouter.put('/item/', isAuth, addToCart);
//end point for updating cart
cartRouter.put('/item/cartId', isAuth, updateCart);
//end point for deleting from cart
cartRouter.delete('/item/:productId', isAuth, deleteItem);
//end point for check out
cartRouter.post('/:cartId/checkout', checkout);

module.exports = {
    cartRouter
};