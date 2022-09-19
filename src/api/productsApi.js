const express = require('express');
const router = express.Router();
const path = require('path');
const db = require("../database/models/index")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const productsApi = {

    listadoProductos: (req, res) => {
        
        let products = db.Producto.findAll()
        let categories = db.Categoria.findAll()
        /* let productByCategory = db.Producto.findAll({
            where: {categoria: categoria_id}
        })
        Promise.all([products, categories, productByCategory])
        .then(([resultProducts, resultCategories, resultProductByCategory]) => {
                return res.json({
                productos: resultProducts,
                categorias: resultCategories,
                productosPorCategoria: resultProductByCategory,
                url: "api/products",
                status: 200
            })
        }) */
        
        Promise.all([products, categories])
        .then(([resultProducts, resultCategories]) => {
                return res.json({
                productos: resultProducts,
                categorias: resultCategories,
                url: "api/products",
                status: 200
            })
        })

    },

    detalleProducto: (req, res) =>{
        db.Producto.findByPk(req.params.id)
        .then((productDetail) => {
            console.log(productDetail)
            return res.json({
                data: productDetail,
                urlImages: "",
                status: 200
            })
        })
    },

}   

module.exports = productsApi;

// ENTREGABLE: URL funcionales devolviendo datos de productos en formato JSON.
