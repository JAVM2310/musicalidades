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

            for(let i=0; i<resultProducts.length; i++){
                resultProducts[i].dataValues.url = "http://localhost:3001/api/products/" + resultProducts[i].dataValues.id
            }

            resultLastProduct[0].dataValues.url = "http://localhost:3001/api/products/" + resultLastProduct[0].dataValues.id
            resultLastProduct[0].dataValues.imagenes = resultLastProduct[0].dataValues.imagenes.replaceAll("/products/", "http://localhost:3001/img/products/");
            resultLastProduct[0].dataValues.imagenes = JSON.parse(resultLastProduct[0].dataValues.imagenes)[0]
            
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

    detalleProducto: (req, res) =>{
        let detalleProducto = {};
        db.Producto.findByPk(req.params.id)
        .then((productDetail) => {
            if(productDetail !=null){
                detalleProducto.producto = productDetail;
                detalleProducto.producto.dataValues.imagenes = detalleProducto.producto.dataValues.imagenes.replaceAll("/products/", "http://localhost:3001/img/products/");
                
                db.Categoria.findAll({
                    where: {
                        id: productDetail.categoria_id
                    },
                })
                .then((productCategory)=>{
                    detalleProducto.categoria = productCategory;
                    return res.json({
                        data: {
                            detalleProducto
                        },
                        info: {
                            url: "api/products/" + req.params.id,
                            status: 200
                        }
                    })
                    })
            }else{
                return res.json("No se encontró el producto en la Base de Datos")
            }
        })
    },
}   

module.exports = productsApi;