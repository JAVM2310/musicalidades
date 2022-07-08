const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const editor = require("../database/editProducts")

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let titulo = "";


const controller = {
    tienda: (req, res) => {
        let titulo = "Tienda"
        res.render('./tienda/tienda', {titulo: titulo, products: products});
    },
    productDetail: (req, res) => {
        let titulo = "Detalle de Producto"
        let chosenProductIndex = products.findIndex(product => product.id == req.params.id)
        let chosenProduct = products[chosenProductIndex]
        res.render('./tienda/productDetail', {titulo: titulo, product:chosenProduct});
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
        editor.create(req.body);
        res.redirect("/tienda/newProduct");
    },
    modifyProduct: (req, res) => {
        let titulo = "Modificar Producto"
        res.render("./tienda/modifyProduct", {titulo: titulo});
    },
    modify: (req, res) => {
        editor.modify(req.body);
        res.redirect("/tienda/modifyProduct")
    }
};



module.exports = controller;