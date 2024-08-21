const express = require('express');
const { getAllProducts, getProductsByCategory, getProductByName } = require('../controllers/products');

const productRouter = express.Router();
productRouter.get('/', getAllProducts);
productRouter.get('/:category', getProductsByCategory);
productRouter.get('/name:id', getProductByName);

module.exports = {
    productRouter
};