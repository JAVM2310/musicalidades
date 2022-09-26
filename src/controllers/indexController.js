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
        if (req.session.usuariosLogueado) {
            if (req.session.usuariosLogueado.permisos == 9){
                return res.render('faq', {titulo: "FAQ", user: req.session.usuariosLogueado, admin: true});
            }
        }
        return res.render('faq', {titulo: "FAQ", user: req.session.usuariosLogueado, admin: false});
    },
    quienesSomos: (req, res) => {
        if (req.session.usuariosLogueado) {
            if (req.session.usuariosLogueado.permisos == 9){
                return res.render('quienes-somos', {titulo: "Quienes Somos", user: req.session.usuariosLogueado, admin: true});
            }
        }
        return res.render('quienes-somos', {titulo: "Quienes Somos", user: req.session.usuariosLogueado, admin: false});
    },
    contactoGet: (req, res) => {
        if (req.session.usuariosLogueado) {
            if (req.session.usuariosLogueado.permisos == 9){
                return res.render('contacto', {titulo: "Contacto", user: req.session.usuariosLogueado, admin: true});
            }
        }
        return res.render('contacto', {titulo: "Contacto", user: req.session.usuariosLogueado, admin: false});
    },
    contactoPost: (req, res) => {
        let errors = validationResult(req);

        console.log(errors.array());

        if(errors.isEmpty()){
            fs.appendFileSync(path.join(__dirname, "../../mensajes-contacto/" + req.body.email + "-" + Date.now() + ".txt"),`de parte de ${req.body.nombre}: \n ${req.body.mensaje}`)
            return res.redirect("/")
        }else{
            if (req.session.usuariosLogueado) {
                if (req.session.usuariosLogueado.permisos == 9){
                    return res.render('contacto', {titulo: "Contacto", errors: errors.array(), old: req.body, user: req.session.usuariosLogueado, admin: true});
                }
            }
            return res.render('contacto', {titulo: "Contacto", errors: errors.array(), old: req.body, user: req.session.usuariosLogueado, admin: false});
        }
        
    }
};



module.exports = controller;
