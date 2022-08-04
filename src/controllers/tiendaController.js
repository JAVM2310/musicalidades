const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const editor = require("../database/editProducts");
const { stringify } = require('querystring');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let titulo = ""; 
let user = undefined
let admin = false


const controller = {
    tienda: (req, res) => {
        let titulo = "Tienda";
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('./tienda/tienda', {titulo: titulo, products: products, user: req.session.usuariosLogueado});
    },
    productDetail: (req, res) => {
        let titulo = "Detalle de Producto";
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let chosenProductIndex = products.findIndex(product => product.id == req.params.id)
        let chosenProduct = products[chosenProductIndex]
        
        if (req.session.usuariosLogueado) {
            if (req.session.usuariosLogueado.tipo == 9){
                admin = true
                return res.render('./tienda/productDetail', {titulo: titulo, product:chosenProduct, user: req.session.usuariosLogueado, admin});
                admin = false
                console.log(admin);
            }
        }
        admin = false
        return res.render('./tienda/productDetail', {titulo: titulo, product:chosenProduct, user: req.session.usuariosLogueado, admin});
    },
    productCart: (req, res) => {
        let titulo = "Carrito";
        res.render('./tienda/productCart', {titulo: titulo, user: req.session.usuariosLogueado});
    },
    newProduct: (req, res) => {
        let titulo = "Nuevo Producto";
        res.render('./tienda/newProduct', {titulo: titulo, user: req.session.usuariosLogueado});
    },
    createProduct: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); //para que vuelva a cargar el json, sino cuando creo un producto y lo quiero mostrar en el redirect, no lo trae xq esta leyendo el json previo a la creacion
        editor.createProduct(req.body, req.files);
        let lastProduct = products.slice(-1)[0];
        let lastId = lastProduct.id + 1;
        //console.log(req.files); 
        console.log(req.body.name)
        res.redirect("/tienda/productDetail/" + lastId);
        //res.send('hola');
    },
    modifyProduct: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let chosenProductIndex = products.findIndex(product => product.id == req.params.id)
        let chosenProduct = products[chosenProductIndex];
        let titulo = "Modificar Producto";
        res.render('./tienda/modifyProduct', {titulo: titulo, product:chosenProduct, user: req.session.usuariosLogueado});        
    },
    modify: (req, res) => {
        let id = req.params.id;
        let productToEdit = products.find(product => product.id == id);
        /* console.log(productToEdit);
        console.log(req.files); */
        let imagenesNuevas = [];

        for (i=0; i<productToEdit.image.length; i++){
            if(eval("req.body.imgDel"+i) == 1) {
                fs.unlink(path.join(__dirname, "../../public/img/") + productToEdit.image[0], error => console.log("se borro el archivo " + productToEdit.image[0] + " en la carpeta " + path.join(__dirname, "../../public/img/products/")))
                productToEdit.image.splice("req.body.imgDel"+i, 1)
            }
        }

        for (let i=0; i<req.files.length; i++){
            imagenesNuevas = '/products/' + req.files[i].filename;
            productToEdit.image.push(imagenesNuevas)            
        }
        
        productToEdit = {
            id: productToEdit.id,
            categoria: req.body.categoria,
            name: req.body.name,
            shortDesc: req.body.shortDesc,
            longDesc: req.body.longDesc,
            price: req.body.price,
            discount: req.body.discount,
            stock: req.body.stock,
            marca: req.body.marca,
            image: productToEdit.image
        };

        let indice = products.findIndex(product => product.id == id);
        products[indice] = productToEdit;
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))

        
        res.redirect("/tienda/productDetail/" + productToEdit.id);
    },
    delete(req, res){
        editor.deleteProduct(Number(req.params.id.slice(1)))
        let id = req.params.id
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('index', {titulo: "Home", products: products, deleteMessage: "se borro el producto con la id: " + id.slice(1), mensaje: "", user: req.session.usuariosLogueado});
    }
};



module.exports = controller;