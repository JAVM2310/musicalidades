
const { body } = require("express-validator")

module.exports = [
    body("cantidad")
        .exists({checkFalsy: true}).withMessage("La cantidad debe ser un numero entre 1 y el stock").bail()
        .isNumeric().withMessage("La cantidad debe ser un numero entre 1 y el stock").bail(),
    body("productoId")
        .exists({checkFalsy: true}).withMessage("No se encontro el producto").bail()
        .isNumeric().withMessage("No se encontro el producto").bail(),
]