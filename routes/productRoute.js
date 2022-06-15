const express = require('express');
const router = express.Router();
const path = require('path');

/* CON ARCHIVO CONTROLLER*/

const productController = require ('../controllers/productController');

router.get('/productDetail', productController.productDetail);
router.get('/productCart', productController.productCart);
router.get('/tienda', productController.tienda);



module.exports = router;