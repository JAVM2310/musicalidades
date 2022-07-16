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
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('./tienda/tienda', {titulo: titulo, products: products});
    },
    productDetail: (req, res) => {
        let titulo = "Detalle de Producto"
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
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
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); //para que vuelva a cargar el json, sino cuando creo un producto y lo quiero mostrar en el redirect, no lo trae xq esta leyendo el json previo a la creacion
        editor.create(req.body, req.files);
        let lastProduct = products.slice(-1)[0];
        let lastId = lastProduct.id + 1;
        //console.log(req.files);
        res.redirect("/tienda/productDetail/" + lastId);
        //res.send('hola');
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