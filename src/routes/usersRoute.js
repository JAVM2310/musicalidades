const express = require('express');
const router = express.Router();
const path = require('path');

/* CON ARCHIVO CONTROLLER*/

const usersController = require ('../controllers/usersController.js');

router.get('/login', usersController.login);
router.get('/register', usersController.register); 


module.exports = router;