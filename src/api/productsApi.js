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
        let categoriasPorProducto = db.Producto.findAll({
            group: ["categoria_id"],
            attributes: ['categoria_id', [Sequelize.fn('COUNT', 'categoria_id'), 'asdasdasd']],
        })

        
        Promise.all([products, categories, categoriasPorProducto])
        .then(([resultProducts, resultCategories, resultCategoriasPorProducto]) => {
                    return res.json({
                    productosPorCategoria: resultCategoriasPorProducto,
                    productos: resultProducts,
                    categorias: resultCategories,
                    productosTotal: resultProducts.length,
                    categoriasTotal: resultCategories.length,
                    url: "api/products/:id",
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
