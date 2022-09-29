const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const editor = require("../database/editProducts");
const { stringify } = require('querystring');
const db = require("../database/models/index")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { validationResult } = require("express-validator");

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let titulo = ""; 
let user = undefined
let admin = false

const controller = {
    tiendaGet: (req, res) => {
        /*db.Producto.findAll(/* {
            limit: 4,
            offset:4
        })
        .then((result) => {
            productos = []
            result.forEach(element => {
                productos.push(element.dataValues)
            })
            productos.forEach(producto => {
                producto.imagenes = JSON.parse(producto.imagenes)
            })
        })
        .then(()=>{*/
            if (req.session.usuariosLogueado) {
                if (req.session.usuariosLogueado.permisos == 9){
                    return res.render('./tienda/tienda', {titulo: "Tienda", /* products: productos,  */user: req.session.usuariosLogueado, admin: true});
                }
            }
            return res.render('./tienda/tienda', {titulo: "Tienda", /* products: productos,  */user: req.session.usuariosLogueado, admin: false});
        /* }) */
            
    },
    productDetailGet(req, res){
        let marca;
        let categoria;
        db.Producto.findByPk(req.params.id)
        .then((producto) =>{ 
            if(producto != null){
                productoElegido = producto.dataValues
                productoElegido.imagenes = JSON.parse(productoElegido.imagenes)
                db.Marca.findByPk(producto.dataValues.marca_id)
                .then((result)=>{
                    marca = result.dataValues.nombre
                })
                db.Categoria.findByPk(producto.dataValues.categoria_id)
                .then((result)=>{
                    categoria = result.dataValues.tipo
                })
                .then(() => {
                if (req.session.usuariosLogueado) {
                    if (req.session.usuariosLogueado.permisos == 9){
                        return res.render('./tienda/productDetail', {titulo: "Detalle de Producto", product:productoElegido, user: req.session.usuariosLogueado, admin: true, marca, categoria});
                    }
                }
                return res.render('./tienda/productDetail', {titulo: "Detalle de Producto", product:productoElegido, user: req.session.usuariosLogueado, admin: false, marca, categoria})
                })
            }else{    
            res.status(404).render('not-found');
            }
        })
    },
    productCartGet: (req, res) => {
        if (req.session.usuariosLogueado) {
            if (req.session.usuariosLogueado.permisos == 9){
                return res.render('./tienda/productCart', {titulo: "Carrito", user: req.session.usuariosLogueado, admin: true});
            }
        }

        return res.render('./tienda/productCart', {titulo: "Carrito", user: req.session.usuariosLogueado, admin: false});
    },
    newProductGet: (req, res) => {
        let marcas = []
        let categorias = []
        let laMarca ="";
        let laCategoria ="";
        db.Categoria.findAll({
            order:[['tipo', 'ASC']]
        })
        .then(result =>{
            result.forEach(element => {
                categorias.push(element.dataValues)
            })
        })
        .then(()=>{
            db.Marca.findAll({
                order:[['nombre', 'ASC']]
            })
            .then((result) =>{
                result.forEach(element => {
                    marcas.push(element.dataValues)
                })
            })
            .then(() => {
                return res.render('./tienda/newProduct', {titulo: "Nuevo Producto", user: req.session.usuariosLogueado, marcas, laMarca, categorias, laCategoria});
            })
        })
    },
    newProductPost: (req, res) => {
    
        let imagenes = []
        let marca;

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            let marcas = []
            let categorias = []
            let laMarca = req.body.marca;
            let laCategoria = req.body.categoria
            db.Categoria.findAll({
                order:[['tipo', 'ASC']]
            })
            .then(result =>{
                result.forEach(element => {
                    categorias.push(element.dataValues)
                })
            })
            .then(()=>{
                db.Marca.findAll({
                    order:[['nombre', 'ASC']]
                })
                .then((result) =>{
                    result.forEach(element => {
                        marcas.push(element.dataValues)
                    })
                })
                .then(() => {
                    return res.render('./tienda/newProduct', {titulo: "Nuevo Producto", user: req.session.usuariosLogueado, marcas, errors: resultValidation.mapped(), laMarca, laCategoria, categorias, old: req.body});
                })
            })
        } else {
            req.files.forEach(file =>{
                imagenes.push("/products/" + file.filename)
            })
            imagenes = JSON.stringify(imagenes)
            if (req.body.marcaNueva == 1){
                db.Marca.create({
                    nombre: req.body.marcaNuevaNombre
                })
                .then((result) =>{
                    marca = result.dataValues.id
                    db.Producto.create({
                        nombre: req.body.name,
                        descripcion: req.body.shortDesc,
                        descLarga: req.body.longDesc,
                        precio:  req.body.price,
                        descuento: req.body.discount,
                        stock: req.body.stock,
                        imagenes: imagenes,
                        marca_id: marca,
                        categoria_id:  req.body.categoria,
                    })
                    .then((result)=>{
                            res.redirect("/tienda/productDetail/" + result.dataValues.id);
                    })
                })
            } else {
                marca = req.body.marca
                db.Producto.create({
                    nombre: req.body.name,
                    descripcion: req.body.shortDesc,
                    descLarga: req.body.longDesc,
                    precio:  req.body.price,
                    descuento: req.body.discount,
                    stock: req.body.stock,
                    imagenes: imagenes,
                    marca_id: marca,
                    categoria_id:  req.body.categoria,
                })
                .then((result) => {
                    res.redirect("/tienda/productDetail/" + result.dataValues.id);
                })
            }
        }
    },
    modifyProductGet: (req, res) => {
        let marcas = [];
        let categorias = [];
        let laMarca = "";
        let laCategoria = "";
        let promesaMarcas = db.Marca.findAll({
            order:[['nombre', 'ASC']]
        })
        let promesaCategorias = db.Categoria.findAll({
            order:[['tipo', 'ASC']]
        })
        Promise.all([promesaMarcas, promesaCategorias])
        .then(([resultMarcas, resultCategorias]) =>{
            resultMarcas.forEach(element => {
                marcas.push(element.dataValues)
            })
            resultCategorias.forEach(element => {
                categorias.push(element.dataValues)
            })
        })
        .then(()=>{
            db.Producto.findByPk(req.params.id)
            .then((producto) =>{
                productoElegido = producto.dataValues
                productoElegido.imagenes = JSON.parse(productoElegido.imagenes)
                return res.render('./tienda/modifyProduct', {titulo: "Modificar Producto", product: productoElegido, user: req.session.usuariosLogueado, marcas, categorias, laMarca, laCategoria});
                
            })
        })
    },
    modifyProductPost: (req, res) => {
        console.log(req.files.length)
        let laMarca = req.body.marca
        let laCategoria = req.body.categoria
        var marca;
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            let marcas = [];
            let categorias = [];
            let promesaMarcas = db.Marca.findAll({
                order:[['nombre', 'ASC']]
            })
            let promesaCategorias = db.Categoria.findAll({
                order:[['tipo', 'ASC']]
            })
            Promise.all([promesaMarcas, promesaCategorias])
            .then(([resultMarcas, resultCategorias]) =>{
                resultMarcas.forEach(element => {
                    marcas.push(element.dataValues)
                })
                resultCategorias.forEach(element => {
                    categorias.push(element.dataValues)
                })
            })
            .then(()=>{
                db.Producto.findByPk(req.params.id)
                .then((producto) =>{
                    productoElegido = producto.dataValues
                    productoElegido.imagenes = JSON.parse(productoElegido.imagenes)
                    return res.render('./tienda/modifyProduct', {titulo: "Modificar Producto", product: productoElegido, user: req.session.usuariosLogueado, marcas, categorias, errors: resultValidation.mapped(), old: req.body, laMarca, laCategoria});
                    
                })
            })
        } 
        let cantidadImagenes;
        let contadorImagenesBorradas = 0
        db.Producto.findByPk(req.params.id)
        .then((result)=>{
            cantidadImagenes = JSON.parse(result.dataValues.imagenes).length
            for (i = 0 ; i < cantidadImagenes; i++){
                if (eval("req.body.imgDel"+i) == 1){
                    contadorImagenesBorradas += 1
                }
            }
        if (cantidadImagenes == contadorImagenesBorradas && req.files.length == 0){
            let marcas = [];
            let categorias = [];
            let mensajeErrorImg = "El producto debe conservar al menos 1 imagen"
            let promesaMarcas = db.Marca.findAll({
                order:[['nombre', 'ASC']]
            })
            let promesaCategorias = db.Categoria.findAll({
                order:[['tipo', 'ASC']]
            })
            Promise.all([promesaMarcas, promesaCategorias])
            .then(([resultMarcas, resultCategorias]) =>{
                resultMarcas.forEach(element => {
                    marcas.push(element.dataValues)
                })
                resultCategorias.forEach(element => {
                    categorias.push(element.dataValues)
                })
            })
            .then(()=>{
                db.Producto.findByPk(req.params.id)
                .then((producto) =>{
                    productoElegido = producto.dataValues
                    productoElegido.imagenes = JSON.parse(productoElegido.imagenes)
                    return res.render('./tienda/modifyProduct', {titulo: "Modificar Producto", product: productoElegido, user: req.session.usuariosLogueado, marcas, categorias, errors: {images:{msg: mensajeErrorImg}}, old: req.body, laMarca, laCategoria});
                })
            })
        } else {
            db.Producto.findByPk(req.params.id)
            .then((result) => {
                let productToEdit = result.dataValues
                productToEdit.imagenes = JSON.parse(productToEdit.imagenes)
                let i = 0
                productToEdit.imagenes.forEach((element, index) => {
                    if(eval("req.body.imgDel"+i) == 1) {
                        fs.unlink(path.join(__dirname, "../../public/img/") + element, log => console.log("Se borró el archivo: " + element + " en la carpeta: " + path.join(__dirname, "../../public/img/products/")))
                        productToEdit.imagenes[index] = "deleted"
                    }
                    i +=1;
                })
                productToEdit.imagenes = productToEdit.imagenes.filter(element => {
                    return element !== "deleted";
                });
                for (let i=0; i<req.files.length; i++){
                    imagenesNuevas = '/products/' + req.files[i].filename;
                    productToEdit.imagenes.push(imagenesNuevas)            
                }
                if (req.body.marcaNueva == 1){
                    db.Marca.create({
                        nombre: req.body.marcaNuevaNombre
                    })
                    .then((result) =>{
                        marca = result.dataValues.id
                        productToEdit = {
                            categoria_id: req.body.categoria,
                            nombre: req.body.name,
                            descripcion: req.body.shortDesc,
                            descLarga: req.body.longDesc,
                            precio: req.body.price,
                            descuento: req.body.discount,
                            stock: req.body.stock,
                            marca_id: marca,
                            imagenes: JSON.stringify(productToEdit.imagenes)
                        };
                        db.Producto.update(productToEdit,{
                            where:{
                                id: req.params.id
                            }
                        })
                        .then(()=>{    
                            return res.redirect("/tienda/productDetail/" + req.params.id);
                        })
                    })
                } else {
                    marca = req.body.marca
                    productToEdit = {
                        categoria_id: req.body.categoria,
                        nombre: req.body.name,
                        descripcion: req.body.shortDesc,
                        descLarga: req.body.longDesc,
                        precio: req.body.price,
                        descuento: req.body.discount,
                        stock: req.body.stock,
                        marca_id: marca,
                        imagenes: JSON.stringify(productToEdit.imagenes)
                    };
                    db.Producto.update(productToEdit,{
                        where:{
                            id: req.params.id
                        }
                    })
                    .then(()=>{    
                        return res.redirect("/tienda/productDetail/" + req.params.id);
                    })
                }
            })
        }
    })
    },
    delete(req, res){
        db.Producto.findByPk(req.params.id)
        .then((producto)=>{
            producto.dataValues.imagenes = JSON.parse(producto.dataValues.imagenes)
            producto.dataValues.imagenes.forEach(imagen => {
                fs.unlink(path.join(__dirname, "../../public/img/") + imagen, log => console.log("se borro el archivo: " + imagen + " en la carpeta: " + path.join(__dirname, "../../public/img/products/")))
            })
            db.Producto.destroy({
                where:{id: req.params.id}
            })
        })
        .then(()=>{
            res.redirect("/")
        })
    },
};

module.exports = controller;