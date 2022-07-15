const express = require('express');
const router = express.Router();
const path = require('path');
const {check} = require('express-validator');
const {validationResult} = require('express-validator');

let titulo = "";

const controller = {
    index: (req, res) => {
        let titulo = "Home"
        res.render('index', {titulo: titulo});
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
        //let mensajeGracias = "Mensaje enviado! Gracias por Contactarte con Tienda MUSICALIDADES";
        //res.send('HOLA')
        let errors = validationResult(req);
        console.log('bbbbbbbbbbbbbbbbbbb' + errors);
        if(errors.isEmpty()){
            res.render('contacto', {titulo});
        }else{
            res.render('contacto', {titulo: titulo, errors: errors.array(), old: req.body});
        }
    }
};



module.exports = controller;
