const express = require('express');
const router = express.Router();
const path = require('path');

let titulo = "";

const controller = {
    productDetail: (req, res) => {
        let titulo = "Detalle de Producto"
        res.render('./products/productDetail', {titulo: titulo});
    },
    productCart: (req, res) => {
        let titulo = "Carrito"
        res.render('./products/productCart', {titulo: titulo});
    },
    tienda: (req, res) => {
        let titulo = "Tienda"
        res.render('./products/tienda', {titulo: titulo});
    }
};



module.exports = controller;