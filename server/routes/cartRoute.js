const express = require('express');
const { openCart, getFromCart, addToCart, updateCart, deleteItem, checkout } = require('../controllers/cart');

const cartRouter = express.Router();
//end point for getting details from a customer cart
cartRouter.get('/', getFromCart); //might need to change this end point? 
//end point for opening a cart
cartRouter.post('/open', openCart);
//end point for adding product to cart
cartRouter.put('/item/', addToCart);
//end point for updating cart
cartRouter.put('/item/:cartId', updateCart);
//end point for deleting from cart
cartRouter.delete('/item/:productId', deleteItem);
//end point for check out
cartRouter.post('/:cartId/checkout', checkout);

module.exports = {
    cartRouter
};