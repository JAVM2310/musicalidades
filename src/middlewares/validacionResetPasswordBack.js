const { body } = require("express-validator");

module.exports = [
    body('email').notEmpty().withMessage('Debe completar su email').bail().isEmail().withMessage('Debes ingresar un email válido'),
]