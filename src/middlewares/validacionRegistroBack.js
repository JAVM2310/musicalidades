const { body } = require("express-validator")
const db = require("../database/models")


module.exports = [
    body("nombre")
        .exists({checkFalsy: true}).withMessage("El nombre es obligatorio").bail()
        .isLength({min: 2}).withMessage("EL nombre debe tener por lo menos 2 caracteres").bail(),

    body("apellido")
        .exists({checkFalsy: true}).withMessage("El apellido es obligatorio").bail()
        .isLength({min: 2}).withMessage("EL apellido debe tener por lo menos 2 caracteres").bail(),

    body("email")
        .exists({checkFalsy: true}).withMessage("El email es obligatorio").bail()
        .isEmail().withMessage("El email no es valido").bail()
        /* .custom(value =>{
                db.Usuario.findOne({
                    where:{
                        email: value
                    }
                })
                .then((usuario)=>{
                    if (usuario){
                        return Promise.reject("EL email ya esta en uso")
                    } else {
                        return true
                    }
                })
            }).bail() */,

    body("password")
        .exists({checkFalsy: true}).withMessage("La contraseña es obligatoria").bail()
        .custom(value => {
            if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/).test(value)){
                return Promise.reject("La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un número")
            } else {
                return true
            }
        }).bail(),

    body("passwordRepetida")
        .exists({checkFalsy: true}).withMessage("Debe repetir la contraseña").bail()
        .custom((value, {req}) => {
            if (value != req.body.passwordRepetida){
                return Promise.reject("Las contraseñas deben ser iguales")
            } else {
                return true
            }
        }).bail(),

    body("pais")
        .exists({checkFalsy: true}).withMessage("El país es obligatorio").bail()
        .isLength({max: 90}).withMessage("El país debe tener como maximo 90 caracteres").bail(),

    body("provincia")
        .exists({checkFalsy: true}).withMessage("La provincia es obligatorio").bail()
        .isLength({max: 90}).withMessage("La provincia debe tener como maximo 90 caracteres").bail(),

    body("ciudad")
        .exists({checkFalsy: true}).withMessage("La ciudad es obligatorio").bail()
        .isLength({max: 90}).withMessage("La ciudad debe tener como maximo 90 caracteres").bail(),

    body("direccion")
        .exists({checkFalsy: true}).withMessage("La direccion es obligatorio").bail()
        .isLength({max: 90}).withMessage("La direccion debe tener como maximo 90 caracteres").bail(),

    body("fechaNac")
        .exists({checkFalsy: true}).withMessage("La fecha de nacimiento es obligatoria").bail(),

    body("codigo")
        .exists({checkFalsy: true}).withMessage("El código postal es obligatorio").bail()
        .custom(value =>{
            if (!(/^\d{4,4}$/.test(value))){
                return Promise.reject("El código postal debe ser un número de 4 cifras")
            } else {
                return true
            }
        }).bail(),

    body("avatar")
    .custom(value =>{
        if (value != null){
            if((/(.jpg)$/).test(value) || (/(.jpeg)$/).test(value) || (/(.png)$/).test(value) || (/(.gif)$/).test(value)){

            } else {
                return Promise.reject("Tiene que ser un archivo en formato: .jpg, .jpeg, .png o .gif")
            }
        } else {
            return true
        }
    }).bail()
]