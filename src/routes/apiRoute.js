const express = require('express');
const router = express.Router();
const path = require('path');


const api = require("../api/usersApi")
const productsApi = require("../api/productsApi")



/************** API USUARIOS *****************/
router.get("/disponible/:email", api.checkearDisponibilidad)
router.get("/users", api.users)
router.get("/users/:id", api.userDetail)


/************** API PRODUCTOS *****************/
router.get("/products", productsApi.listadoProductos)
router.get("/products/:id", productsApi.detalleProducto)


module.exports = router