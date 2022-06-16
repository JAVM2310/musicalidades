const express = require('express');
const router = express.Router();
const path = require('path');

/* CON ARCHIVO CONTROLLER*/

const indexController = require ('../controllers/indexController');

router.get('/', indexController.index);
router.get('/faq', indexController.faq);
router.get('/quienes-somos', indexController.quienesSomos);
router.get('/contacto', indexController.contacto);

/*
router.get('/productCart', indexController.index); 
router.get('/about', indexController.index); 
*/


module.exports = router;