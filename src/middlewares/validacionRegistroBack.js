const { body } = require("express-validator")


module.exports = [
    body("nombre")
        .isEmpty().withMessage("El nombre es obligatorio").bail()
        .isLength({min: 2}).withMessage("EL nombre debe tener por lo menos 2 caracteres").bail(),

    body("apellido")
        .isEmpty().withMessage("El apellido es obligatorio").bail()
        .isLength({min: 2}).withMessage("EL apellido debe tener por lo menos 2 caracteres").bail(),

    body("email")
        .isEmpty().withMessage("El email es obligatorio").bail()
        .isEmail().withMessage("El email no es valido").bail()
        .custom(value =>{
                db.Usuario.findOne(value).then(result =>{
                    if (result){
                        return Promise.reject("EL email ya esta en uso")
                    }
                })
            }).bail(),

    body("password")
        .isEmpty().withMessage("La contraseña es obligatoria").bail()
        .custom(value => {
            if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(value)){
                return Promise.reject("La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula y un número")
            }
        }).bail(),

    body("passwordRepetida")
        .isEmpty().withMessage("Debe repetir la contraseña").bail()
        .custom(value => {
            if (value != req.body.passwordRepetida){
                return Promise.reject("Las contraseñas deben ser iguales")
            }
        }).bail(),

    body("pais")
        .isEmpty().withMessage("El país es obligatorio").bail()
        .isLength({max: 90}).withMessage("El país debe tener como maximo 90 caracteres").bail(),

    body("provincia")
        .isEmpty().withMessage("La provincia es obligatorio").bail()
        .isLength({max: 90}).withMessage("La provincia debe tener como maximo 90 caracteres").bail(),

    body("ciudad")
        .isEmpty().withMessage("La ciudad es obligatorio").bail()
        .isLength({max: 90}).withMessage("La ciudad debe tener como maximo 90 caracteres").bail(),

    body("direccion")
        .isEmpty().withMessage("La direccion es obligatorio").bail()
        .isLength({max: 90}).withMessage("La direccion debe tener como maximo 90 caracteres").bail(),

    body("fechaNac")
        .isEmpty().withMessage("La fecha de nacimiento es obligatoria").bail(),

    body("codigo")
        .isEmpty().withMessage("El código postal es obligatorio").bail()
        .custom(value =>{
            if (!(/^\d{4,4}$/.test(value))){
                return Promise.reject("El código postal debe ser un número de 4 cifras")
            }
        }),

    body("avatar")
    .custom(value =>{
        if (value != null){
            if((/(.jpg)$/).test(value) || (/(.jpeg)$/).test(value) || (/(.png)$/).test(value) || (/(.gif)$/).test(value)){

            } else {
                return Promise.reject("Tiene que ser un archivo en formato: .jpg, .jpeg, .png o .gif")
            }
        }
    })
]