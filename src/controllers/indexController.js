const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const {check} = require('express-validator');
const { validationResult } = require('express-validator');
const db = require("../database/models/index")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let titulo = "";
let admin = false

const controller = {
    index: (req, res) => {
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
            if (req.session.usuariosLogueado) {
                if (req.session.usuariosLogueado.permisos == 9){
                    return res.render('index', {titulo: "Home", products: productos, deleteMessage: "no", mensaje: "", user: req.session.usuariosLogueado, admin: true});
                }
            }
            return res.render('index', {titulo: "Home", products: productos, deleteMessage: "no", mensaje: "", user: req.session.usuariosLogueado, admin: false})
        })
    },
    faq: (req, res) => {
        let titulo = "FAQ"
        res.render('faq', {titulo: titulo, user: req.session.usuariosLogueado});
    },
    quienesSomos: (req, res) => {
        let titulo = "Quienes Somos"
        res.render('quienes-somos', {titulo: titulo, user: req.session.usuariosLogueado});
    },
    contacto: (req, res) => {
        let titulo = "Contacto"
        res.render('contacto', {titulo, user: req.session.usuariosLogueado});
    },
    mandarMensaje: (req, res) => {
        let titulo = "Contacto";
        let errors = validationResult(req);

        console.log(errors.array());

        if(errors.isEmpty()){
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            res.render('index', {titulo: titulo, products: products, deleteMessage: "no", mensaje: "gracias por dejarnos tu mensaje", user: req.session.usuariosLogueado});
        }else{
            res.render('contacto', {titulo: "Contacto", errors: errors.array(), old: req.body, user: req.session.usuariosLogueado});
        }
        
    }
};



module.exports = controller;
