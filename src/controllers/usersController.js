const express = require('express');
const router = express.Router();
const path = require('path');

let titulo = "";

const controller = {

    login: (req, res) => {
        let titulo = "Login"
        res.render('./users/login', {titulo: titulo});
    },

    register: (req, res) => {
        let titulo = "Registro"
        res.render('./users/register', {titulo: titulo});
    },

    logueado: (req, res) => {
        let titulo = "Login"
        res.render('./users/login', {titulo: titulo});
    },
};



module.exports = controller;