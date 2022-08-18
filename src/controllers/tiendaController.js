const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const editor = require("../database/editProducts");
const { stringify } = require('querystring');
const db = require("../database/models/index")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let titulo = ""; 
let user = undefined
let admin = false


const controller = {
    tienda: (req, res) => {
        db.Producto.findAll()
        .then((result) => {
            productos = []
            result.forEach(element => {
                productos.push(element.dataValues)
            })
            productos.forEach(producto => {
                producto.imagenes = JSON.parse(producto.imagenes)
            })
        })
        .then(()=>{
            res.render('./tienda/tienda', {titulo: "Tienda", products: productos, user: req.session.usuariosLogueado});
        })
    },
    /* productDetailOld: (req, res) => {
        let titulo = "Detalle de Producto";
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let chosenProductIndex = products.findIndex(product => product.id == req.params.id)
        let chosenProduct = products[chosenProductIndex]
        
        if (req.session.usuariosLogueado) {
            if (req.session.usuariosLogueado.permisos == 9){
                console.log(chosenProduct);
                return res.render('./tienda/productDetail', {titulo: titulo, product:chosenProduct, user: req.session.usuariosLogueado, admin: true});
            }
        }
        console.log(chosenProduct);
        return res.render('./tienda/productDetail', {titulo: titulo, product:chosenProduct, user: req.session.usuariosLogueado, admin});
    }, */
    productDetail(req, res){
        db.Producto.findByPk(req.params.id)
        .then((producto) =>{ 
            productoElegido = producto.dataValues
            productoElegido.imagenes = JSON.parse(productoElegido.imagenes)
        })
        .then(() => {
        if (req.session.usuariosLogueado) {
            if (req.session.usuariosLogueado.tipo == 9){
                return res.render('./tienda/productDetail', {titulo: "Detalle de Producto", product:productoElegido, user: req.session.usuariosLogueado, admin: true});
            }
        }
        return res.render('./tienda/productDetail', {titulo: "Detalle de Producto", product:productoElegido, user: req.session.usuariosLogueado, admin: false})
        })
    },
    productCart: (req, res) => {

        res.render('./tienda/productCart', {titulo: "Carrito", user: req.session.usuariosLogueado});
    },
    newProduct: (req, res) => {
        let marcas = []
        db.Marca.findAll()
        .then((result) =>{
            result.forEach(element => {
                marcas.push(element.dataValues)
            })
        })
        .then(() => {
        res.render('./tienda/newProduct', {titulo: "Nuevo Producto", user: req.session.usuariosLogueado, marcas});
        })
    },
    createProduct: (req, res) => {
        req.files.forEach(file =>{
            imagenes = []
            imagenes.push("/products/" + file.filename)
            imagenes = JSON.stringify(imagenes)
        })
        .then(()=>{
            if (req.body.marcaNueva == 1){
                db.Marca.create({
                    nombre: req.body.marcaNuevaNombre
                })
                .then(()=>{
                    db.Marca.findOne({
                        where:{
                            nombre: req.body.marcaNuevaNombre
                        }
                    })
                    .then((result) =>{
                        console.log(result);
                        db.Producto.create({
                            nombre: req.body.name,
                            descripcion: req.body.shortDesc,
                            descLarga: req.body.longDesc,
                            precio:  req.body.price,
                            descuento: req.body.discount,
                            stock: req.body.stock,
                            imagenes: imagenes,
                            marca_id: result.dataValues.id,
                            categoria_id:  req.body.categoria,
                        })
                    })
                })
            } else {
                db.Producto.create({
                nombre: req.body.name,
                descripcion: req.body.shortDesc,
                descLarga: req.body.longDesc,
                precio:  req.body.price,
                descuento: req.body.discount,
                stock: req.body.stock,
                imagenes: imagenes,
                marca_id: req.body.marca,
                categoria_id:  req.body.categoria,
            })
        }
        })
        .then(()=>{
            db.Producto.findOne({
                where:{
                    nombre: req.body.name
                }
            })
        })
        .then((result) => {
            res.redirect("/tienda/productDetail/" + result.dataValues.id);
        })
    },
    modifyProduct: (req, res) => {
        let marcas = []
        db.Marca.findAll()
        .then((result) =>{
            result.forEach(element => {
                marcas.push(element.dataValues)
            })
        })
        .then(()=>{
            db.Producto.findByPk(req.params.id)
            .then((producto) =>{ 
                productoElegido = producto.dataValues
                productoElegido.imagenes = JSON.parse(productoElegido.imagenes)
            })
        })
        .then(()=>{
            res.render('./tienda/modifyProduct', {titulo: "Modificar Producto", product:productoElegido, user: req.session.usuariosLogueado, marcas});        
        })
    },
    modify: (req, res) => {
        
        db.Producto.findByPk(req.params.id)
        .then((result) => {
            let productToEdit = result.dataValues
            productToEdit.imagenes = JSON.parse(productToEdit.imagenes)

            for (i=0; i<productToEdit.imagenes.length; i++){
                if(eval("req.body.imgDel"+i) == 1) {
                    fs.unlink(path.join(__dirname, "../../public/img/") + productToEdit.image[0], log => console.log("se borro el archivo " + productToEdit.image[0] + " en la carpeta " + path.join(__dirname, "../../public/img/products/")))
                    productToEdit.image.splice("req.body.imgDel"+i, 1)
                }
            }
            
            for (let i=0; i<req.files.length; i++){
                imageneNuevas = '/products/' + req.files[i].filename;
                productToEdit.imagenes.push(imageneNuevas)            
            }
            
            productToEdit = {
                categoria_id: req.body.categoria,
                nombre: req.body.name,
                descripcion: req.body.shortDesc,
                descLarga: req.body.longDesc,
                precio: req.body.price,
                descuento: req.body.discount,
                stock: req.body.stock,
                marca_id: req.body.marca,
                imagenes: JSON.stringify(productToEdit.imagenes)
            };

            db.Producto.update(productToEdit,{
                where:{
                    id: req.params.id
                }
            })
        })
        
        res.redirect("/tienda/productDetail/" + req.params.id);
    },
    delete(req, res){
        editor.deleteProduct(Number(req.params.id.slice(1)))
        let id = req.params.id
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('index', {titulo: "Home", products: products, deleteMessage: "se borro el producto con la id: " + id.slice(1), mensaje: "", user: req.session.usuariosLogueado});
    },

};



module.exports = controller;