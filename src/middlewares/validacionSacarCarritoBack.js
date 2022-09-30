const { body } = require("express-validator");

module.exports = [
    body('id')
        .exists({checkFalsy: true}).withMessage("lo sentimos, hubo un error").bail()
        .isNumeric().withMessage("lo sentimos, hubo un error").bail(),
]