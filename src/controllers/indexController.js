const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
const {check} = require('express-validator');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let titulo = "";

const controller = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let titulo = "Home"
        res.render('index', {titulo: titulo, products: products, deleteMessage: "no", mensaje: "", user: req.session.usuariosLogueado});
    },
    faq: (req, res) => {
        let titulo = "FAQ"
        res.render('faq', {titulo: titulo});
    },
    quienesSomos: (req, res) => {
        let titulo = "Quienes Somos"
        res.render('quienes-somos', {titulo: titulo});
    },
    contacto: (req, res) => {
        let titulo = "Contacto"
        res.render('contacto', {titulo});
        // let errors = validationResult(req);
        // console.log('aaaaaaaaaaaaaaaaaaaaaaa' + errors);
    },
    mandarMensaje: (req, res) => {
        let titulo = "Contacto";
        let errors = validationResult(req);
        let mensaje = "gracias por tu mensaje"

        if(errors.isEmpty()){
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
            let titulo = "Home"
            res.render('index', {titulo: titulo, products: products, deleteMessage: "no", mensaje: "gracias por dejarnos tu mensaje"});
        }else{
            res.render('contacto', {titulo: titulo, errors: errors.array(), old: req.body});
        }
        
    }
};



module.exports = controller;
