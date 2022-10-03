const express = require('express');
const router = express.Router();
const path = require('path');
const db = require("../database/models/index")
const Sequelize = require('sequelize');
const { indexOf } = require('../middlewares/validacionProductosBack');
const Op = Sequelize.Op;
const { validationResult } = require("express-validator");

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
                resultProducts[i].dataValues.imagenes = JSON.parse(resultProducts[i].dataValues.imagenes)
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
    agregarCarrito: (req, res)=>{
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if (resultValidation.errors.length > 0) {
            return res.json("Ocurrió un error, vuelva a intentarlo")
        }
        if (req.session.usuariosLogueado != null) {
            db.ProductoUsuario.findOne({
                where:{
                    usuario_id: req.session.usuariosLogueado.id,
                    producto_id: req.body.productoId
                }
            })
            .then((result)=>{
                if (result == null){
                    console.log("arranca la funcion");
                    console.log("log de req.body");
                    console.log(req.body);
                    console.log(req.session.usuariosLogueado.id);
                    db.ProductoUsuario.create({
                        cantidad: req.body.cantidad,
                        producto_id: req.body.productoId,
                        usuario_id: req.session.usuariosLogueado.id
                    })
                    .then(()=>{
                        return res.json(`Producto agregado a tu carrito`)
                    })
                } else {
                    return res.json(`Ese producto ya esta agregado, revisa tu carrito`)
                }
                })
        } else {
            
            if (req.session.carrito == null) {
                console.log("no es array");
                req.session.carrito = []
                req.session.carrito.push({
                    cantidad: req.body.cantidad,
                    producto_id: req.body.productoId,
                    usuario_id: 0,
                })
                console.log(req.session.carrito);
                return res.json(`Producto agregado a tu carrito`)
            } else {
                if ((req.session.carrito.findIndex(elemento => elemento.producto_id == req.body.productoId)) == -1) {
                    console.log("es array");
                    req.session.carrito.push({
                    cantidad: req.body.cantidad,
                    producto_id: req.body.productoId,
                    usuario_id: 0,
                })
                console.log(req.session.carrito);
                return res.json(`Producto agregado tu carrito`)
            } else {
                return res.json(`Ese producto ya esta agregado, revisa tu carrito`)
            }
            }
        }
    },
    listaCarrito: (req,res)=>{
        if (req.session.usuariosLogueado != null) {
            console.log("un usuario logueado entro al carrito");
            let listaCarrito = [];
            let listaProd = [];
            let productosEnCarrito = []
            let infoUsuario = {}
            db.ProductoUsuario.findAll({
                where:{
                    usuario_id: req.session.usuariosLogueado.id
            }
            })
            .then((result)=>{
                result.map(entrada =>{
                    listaCarrito.push(entrada.dataValues)
                })
                console.log("log de lista carrito");
                console.log(listaCarrito);
                listaCarrito.sort(function(a, b){return a.producto_id-b.producto_id})
                console.log("log de lista carrito ordenada");
                console.log(listaCarrito);
                listaCarrito.forEach(entrada =>{
                    listaProd.push(entrada.producto_id)
                })
                console.log("log de listaProd");
                console.log(listaProd);
                db.Producto.findAll({
                    where:{
                        id: {[Op.in]: listaProd}
                    }
                })
                .then(result =>{
                    result.map(producto =>{
                        productosEnCarrito.push(producto.dataValues)
                    })
                    console.log("log de productosEnCarrito");
                    console.log(productosEnCarrito);
                    /* productosEnCarrito.map(producto =>{
                        console.log("log de producto en el map");
                        console.log(producto);
                        listaCarrito.forEach(entrada =>{
                            if (producto.id = entrada.producto_id) {
                                producto.cantidadEnCarrito = entrada.cantidad
                            }
                            producto.imagenes = JSON.parse(producto.imagenes)
                        })
                        console.log("termino la iteracion del map");
                    }) */
                    listaCarrito.forEach((entrada, i) =>{
                        productosEnCarrito[i].cantidadEnCarrito = entrada.cantidad
                        productosEnCarrito[i].imagenes = JSON.parse(productosEnCarrito[i].imagenes )
                    })
                    db.Usuario.findByPk(req.session.usuariosLogueado.id)
                    .then(result =>{
                        delete result.dataValues.password
                        delete result.dataValues.permisos
                        infoUsuario = result.dataValues
                        return res.json({productosEnCarrito, infoUsuario})
                    })
                })
            })
        } else {
            console.log("un usuario no logueado entro al carrito");
            let infoUsuario = {
                direccion: "",
                provincia: "",
                ciudad: "",
                codPostal: "",
            }
            let listaCarrito = [];
            let listaProd = [];
            let productosEnCarrito = []
            if (req.session.carrito == null) {
                return res.json({productosEnCarrito, infoUsuario})
            } else {
                req.session.carrito.map(element =>{
                    listaProd.push(element.producto_id)
                })
                db.Producto.findAll({
                    where:{
                        id: {[Op.in]: listaProd}
                    }
                })
                .then(result =>{
                    result.map(producto =>{
                        productosEnCarrito.push(producto.dataValues)
                    })
                    req.session.carrito.sort(function(a, b){return a.producto_id-b.producto_id})
                    req.session.carrito.forEach((entrada, i) =>{
                        productosEnCarrito[i].cantidadEnCarrito = entrada.cantidad
                        productosEnCarrito[i].imagenes = JSON.parse(productosEnCarrito[i].imagenes )
                    })
                    return res.json({productosEnCarrito, infoUsuario})
                })
            }
        }
    },
    sacarCarrito: (req, res)=>{
        const resultValidation = validationResult(req);
        console.log(resultValidation);
        if (resultValidation.errors.length > 0) {
            console.log( resultValidation.mapped())
            return res.json("Ocurrió un error, vuelva a intentarlo")
        }
        if (req.session.usuariosLogueado != null) {
            db.ProductoUsuario.destroy({
                where:{
                    usuario_id: req.session.usuariosLogueado.id,
                    producto_id: req.body.id
                }
            })
            .then(()=>{
                return res.json("El producto fue eliminado del carrito")
            })
        } else {
            req.session.carrito.splice(req.session.carrito.findIndex(element => element.producto_id == req.body.id), 1)
            return res.json("El producto fue eliminado del carrito")
        }
    },
    comprar: (req, res) =>{
        const resultValidation = validationResult(req);
        console.log(resultValidation.mapped());
        if (resultValidation.errors.length > 0) {
            return res.json("Ocurrió un error, revise las cantidades de los productos e información de envio y vuelva a intentarlo")
        }
            let mensajeRespuesta = ""
            console.log("arranca la funcion comprar");
            console.log("log de req.body");
            let compra = {monto: 0}
            console.log(req.body);
            let listaProd = []
            req.body.productosAComprar.map(element =>{
                listaProd.push(element.id)
            })
            console.log("log de listaProd");
            console.log(listaProd);
            let promesaProductos = db.Producto.findAll({
                where:{
                    id: {[Op.in]: listaProd}
                }
            })
            Promise.all([promesaProductos])
            .then(([resultProductos])=>{
                resultProductos.map((product, i) =>{
                    if (product.descuento > 0) {
                        compra.monto += (product.dataValues.precio * (100-product.dataValues.descuento)/100) * req.body.productosAComprar[i].cantidad
                        mensajeRespuesta += `${product.dataValues.nombre} x${req.body.productosAComprar[i].cantidad}, `
                    } else {
                        compra.monto += product.dataValues.precio * req.body.productosAComprar[i].cantidad
                    }
                })
                console.log("log de mensajeRespuesta");
                console.log(mensajeRespuesta);
                compra.infoenvio =  `${req.body.infoUsuarioCarrito.ciudad}, ${req.body.infoUsuarioCarrito.provincia}, ${req.body.infoUsuarioCarrito.direccion} codigo postal ${req.body.infoUsuarioCarrito.codPostal}`
                db.Venta.create(compra)
                .then(result =>{
                    console.log(req.body.usuariosLogueado);
                    if (req.session.usuariosLogueado != null) {
                        db.ProductoUsuario.destroy({
                            where:{
                                usuario_id: req.session.usuariosLogueado.id
                            }
                        })
                    }
                        delete req.session.carrito
                    resultProductos.forEach((producto, i) =>{
                        db.Producto.update({stock: producto.stock - req.body.productosAComprar[i].cantidad},{where:{id: producto.id}})
                    })
                    return res.json(`Se realizó tu compra de ${mensajeRespuesta} el total de la compra es de ${Intl.NumberFormat("sp-SP").format((compra.monto + 1000))}. Se enviara a ${req.body.infoUsuarioCarrito.ciudad}, ${req.body.infoUsuarioCarrito.provincia}, ${req.body.infoUsuarioCarrito.direccion}`)
                })
            })
    },
}   

module.exports = productsApi;