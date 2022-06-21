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
router.get("/modifyProduct", tiendaController.modifyProduct);
router.put("/modifyProduct", tiendaController.modify)




module.exports = router;