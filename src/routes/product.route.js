const {Router} = require('express');
const { getAllProducts, createProduct, getSingleProduct, updateProduct, deleteProduct, getAllUserProducts } = require('../controller/product.controller');
const { verifyToken } = require('../middleware/verify-token');

const route= Router();

route.get('/', getAllProducts)
route.get('/user', verifyToken, getAllUserProducts)
route.post('/', verifyToken, createProduct)
route.get('/:id', getSingleProduct)
route.patch('/:id', verifyToken, updateProduct)
route.delete('/:id', verifyToken, deleteProduct)

module.exports = route