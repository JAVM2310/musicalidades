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
        res.render('index', {titulo: titulo, products: products, deleteMessage: "no"});
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
        /* console.log(errors) */
        console.log(req.body.params)

        if(errors.isEmpty()){
            res.redirect('index', {titulo});
        }else{
            res.render('contacto', {titulo: titulo, errors: errors.array(), old: req.body});
        }
        
        /* let mensajeGracias = "Mensaje enviado! Gracias por Contactarte con Tienda MUSICALIDADES";
        res.send('HOLA') */
    }
};



module.exports = controller;
