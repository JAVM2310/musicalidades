const { body } = require("express-validator")

module.exports = [
    body("password")
        .exists({checkFalsy: true}).withMessage("Debe escribir su contraseña actuial").bail(),
        
    body("passwordNueva")
        .exists({checkFalsy: true}).withMessage("Debe escribir la nueva contraseña").bail()
        .custom(value => {
            if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).test(value)){
                return Promise.reject("La nueva contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un número")
            } else {
                return true
            }
        }).bail(),

    body("passwordRepetida")
        .exists({checkFalsy: true}).withMessage("Debe repetir la nueva contraseña").bail()
        .custom((value, {req}) => {
            if (value != req.body.passwordNueva){
                return Promise.reject("Las contraseña repetida debe ser igual a la nueva contraseña")
            } else {
                return true
            }
        }).bail(),
]