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
    createProduct: (req, res) => {

        editor.create(req.body, req.files);
        let lastProduct = products.slice(-1)[0];
        let lastId = lastProduct.id + 1;
        //console.log(req.files);
        res.redirect("/tienda/productDetail/" + lastId);
        //res.send('hola');
    },
    modifyProduct: (req, res) => {
        let titulo = "Modificar Producto"
        let chosenProductIndex = products.findIndex(product => product.id == req.params.id);
        let chosenProduct = products[chosenProductIndex];
        res.render("./tienda/modifyProduct", {titulo, product:chosenProduct});
    },
    modify: (req, res) => {
        //editor.modify(req.body);
        res.redirect("/tienda/productDetail/")
    }
};



module.exports = controller;