const express = require('express');
const router = express.Router();
const path = require('path');


const api = require("../api/usersApi")
const productsApi = require("../api/productsApi")


/************** VALIDACIONES *****************/

const validacionAgregarCarrito = require("../middlewares/validacionAgregarCarritoBack")
const validacionSacarCarrito = require("../middlewares/validacionSacarCarritoBack")
const validacionComprarCarrito = require("../middlewares/validacionComprarCarritoBack")

/************************** MIDDLEWARES *********************/
const authMiddleware = require('../middlewares/authMiddleware.js');




/************** API USUARIOS *****************/
router.get("/disponible/:email", api.checkearDisponibilidad)
router.get("/users", api.users)
router.get("/adminCheck", api.adminCheck)

router.get("/users/:id", api.userDetail)
router.get("/resetPassword/:email", api.resetPassword)


/************** API PRODUCTOS *****************/
router.get("/products", productsApi.listadoProductos)
router.get("/products/:id", productsApi.detalleProducto)
router.post("/agregarCarrito", validacionAgregarCarrito, productsApi.agregarCarrito)
router.get("/listaCarrito", productsApi.listaCarrito)
router.post("/sacarCarrito", validacionSacarCarrito, productsApi.sacarCarrito)
router.post("/comprarCarrito", validacionComprarCarrito, productsApi.comprar)


module.exports = router