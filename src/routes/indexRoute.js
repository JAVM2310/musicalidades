const express = require('express');
const router = express.Router();
const path = require('path');
const {body} = require('express-validator');


/* VALIDACIONES */

const validacionesContacto = [
    body('nombre').notEmpty().withMessage('Debes completar tu nombre'),
    body('email').notEmpty().withMessage('Debes completar tu email').bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('mensaje').notEmpty().withMessage('Debes escribir un mensaje')
];

/* CON ARCHIVO CONTROLLER*/

const indexController = require ('../controllers/indexController');

router.get('/', indexController.index);
router.get('/faq', indexController.faq);
router.get('/quienes-somos', indexController.quienesSomos);
router.get('/contacto', validacionesContacto, indexController.contacto);
router.post('/contacto', validacionesContacto, indexController.mandarMensaje);


/*
router.get('/productCart', indexController.index); 
router.get('/about', indexController.index); 
*/


module.exports = router;