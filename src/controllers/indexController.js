const express = require('express');
const router = express.Router();
const path = require('path');

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
        res.render('contacto', {titulo: titulo});
    },
};



module.exports = controller;
