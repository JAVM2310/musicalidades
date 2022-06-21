const express = require('express');
const router = express.Router();
const path = require('path');
const editor = require("../database/editProducts")

let titulo = "";

const controller = {
    tienda: (req, res) => {
        let titulo = "Tienda"
        res.render('./tienda/tienda', {titulo: titulo});
    },
    productDetail: (req, res) => {
        let titulo = "Detalle de Producto"
        res.render('./tienda/productDetail', {titulo: titulo});
    },
    productCart: (req, res) => {
        let titulo = "Carrito"
        res.render('./tienda/productCart', {titulo: titulo});
    },
    newProduct: (req, res) => {
        let titulo = "Nuevo Producto"
        res.render('./tienda/newProduct', {titulo: titulo});
    },
    create: (req, res) => {
        console.log(req.body);
        editor.create(req.body);
        res.redirect("/tienda/newProduct");
    }
};



module.exports = controller;