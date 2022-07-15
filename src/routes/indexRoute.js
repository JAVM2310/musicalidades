const express = require('express');
const router = express.Router();
const path = require('path');
const {check} = require('express-validator');


/* VALIDACIONES */

const validaciones = [
    check('nombreContactenos').notEmpty().withMessage('Debes completar tu nombre'),
    check('emailContactenos').notEmpty().withMessage('Debes completar tu email').bail().isEmail().withMessage('Debes ingresar un email válido'),
    check('mensajeContactenos').notEmpty().withMessage('Debes escribir un mensaje')
];

/* CON ARCHIVO CONTROLLER*/

const indexController = require ('../controllers/indexController');

router.get('/', indexController.index);
router.get('/faq', indexController.faq);
router.get('/quienes-somos', indexController.quienesSomos);
router.get('/contacto', validaciones, indexController.contacto);
router.post('/contacto', validaciones, indexController.mandarMensaje);


/*
router.get('/productCart', indexController.index); 
router.get('/about', indexController.index); 
*/


module.exports = router;