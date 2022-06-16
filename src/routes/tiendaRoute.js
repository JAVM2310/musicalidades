const express = require('express');
const router = express.Router();
const path = require('path');

/* CON ARCHIVO CONTROLLER*/

const tiendaController = require ('../controllers/tiendaController');

router.get('/', tiendaController.tienda);
router.get('/productDetail', tiendaController.productDetail);
router.get('/productCart', tiendaController.productCart);
router.get("/newProduct", tiendaController.newProduct);
router.post("/newProduct", tiendaController.create)




module.exports = router;