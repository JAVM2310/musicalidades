const express = require('express');
const router = express.Router();
const path = require('path');
const db = require("../database/models/index")
const Sequelize = require('sequelize');
const { indexOf } = require('../middlewares/validacionProductosBack');
const Op = Sequelize.Op;

const productsApi = {

    listadoProductos: (req, res) => {

        let products = db.Producto.findAll()
        let categories = db.Categoria.findAll()
        let brands = db.Marca.findAll()
        let productosPorCategoria = db.Categoria.findAll({
            attributes: ['tipo', [Sequelize.fn('COUNT', 'tipo'), 'cantidad']],
            include: [{
                model: db.Producto,
                attributes: ['categoria_id'],
                as: 'categoriaProducto'
            }],
            group: ["tipo"],
        })

        Promise.all([products, categories, brands, productosPorCategoria])
        .then(([resultProducts, resultCategories, resultBrands, resultProductosPorCategoria]) => {
            console.log(resultProducts.length)

            /* for (let i=0, i< in ultimoProductoImg){
                console.log(ultimoProductoImg[imagenes])
            } 
            for (let imagenes in ultimoProductoImg){
                console.log(ultimoProductoImg[imagenes])
            }*/


            return res.json({
                    
                data: {
                    productos: resultProducts,
                    categorias: resultCategories,
                    marcas: resultBrands,
                    countProductos: resultProducts.length,
                    countCategorias: resultCategories.length,
                    countMarcas: resultBrands.length,
                    countProductosPorCategoria: resultProductosPorCategoria,
                },
                info: {
                    url: "api/products",
                    status: 200
                }
            })
        })
    },

    detalleProducto: (req, res) =>{
        db.Producto.findByPk(req.params.id)
        .then((productDetail) => {
            console.log(productDetail)
            return res.json({
                data: productDetail,
                urlImages: productDetail.imagenes,
                status: 200
            })
        })
    },

    //devuelve el producto mas nuevo en la base de datos
    ultimoProducto: (req, res) => {
        db.Producto.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
        })
        .then(result => {
            return res.json(result[0].dataValues)
        })
    },
}   

module.exports = productsApi;

// ENTREGABLE: URL funcionales devolviendo datos de productos en formato JSON.
