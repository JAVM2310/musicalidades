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
        let productsByCategorie = db.Categoria.findAll({
            attributes: ['tipo', [Sequelize.fn('COUNT', 'tipo'), 'cantidad']],
            include: [{
                model: db.Producto,
                attributes: ['categoria_id'],
                as: 'categoriaProducto'
            }],
            group: ["tipo"],
        })
        let lastProduct = db.Producto.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
        })

        Promise.all([products, categories, brands, productsByCategorie, lastProduct])
        .then(([resultProducts, resultCategories, resultBrands, resultproductsByCategorie, resultLastProduct]) => {
            console.log(resultProducts)

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
                    countProductosPorCategoria: resultproductsByCategorie,
                    ultimoProducto: resultLastProduct
                    
                },
                info: {
                    url: "api/products",
                    status: 200
                }
            })
        })
    },

    detalleProducto: (req, res) =>{ // FALTA LA URL A LAS FOTOS
        let detalleProducto = {};
        db.Producto.findByPk(req.params.id)
        .then((productDetail) => {
            if(productDetail !=null){
                detalleProducto.producto = productDetail;
                db.Categoria.findAll({
                    where: {
                        id: productDetail.categoria_id
                    },
                })
                .then((productCategory)=>{
                    detalleProducto.categoria = productCategory;
                        console.log(detalleProducto)
                        return res.json(detalleProducto)
                    })
            }else{
                return res.json("No se encontró el producto en la Base de Datos")
            }
        })
    },
}   

module.exports = productsApi;