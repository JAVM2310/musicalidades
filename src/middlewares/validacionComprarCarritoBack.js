const { body } = require("express-validator");

module.exports = [
    body("infoUsuarioCarrito.provincia")
    .exists({checkFalsy: true}).withMessage("La provincia es obligatorio").bail()
    .isLength({max: 90}).withMessage("La provincia debe tener como maximo 90 caracteres").bail(),

    body("infoUsuarioCarrito.ciudad")
        .exists({checkFalsy: true}).withMessage("La ciudad es obligatorio").bail()
        .isLength({max: 90}).withMessage("La ciudad debe tener como maximo 90 caracteres").bail(),

    body("infoUsuarioCarrito.direccion")
        .exists({checkFalsy: true}).withMessage("La direccion es obligatorio").bail()
        .isLength({max: 90}).withMessage("La direccion debe tener como maximo 90 caracteres").bail(),

    body("infoUsuarioCarrito.codPostal")
        .exists({checkFalsy: true}).withMessage("El código postal es obligatorio").bail()
        .custom(value =>{
            if (!(/^\d{4,4}$/.test(value))){
                return Promise.reject("El código postal debe ser un número de 4 cifras")
            } else {
                return true
            }
        }).bail(),
    
    body("productosAComprar")
        .exists({checkFalsy: true}).withMessage("hubo un error").bail()
        .custom(value=>{
            let mal = 0
            for (let i = 0; i < value.length; i++) {
                if (typeof value[i].cantidad != "number" || typeof value[i].id != "number"){
                    mal ++
                }
            }
            if (mal > 0) {
                return Promise.reject("hubo un error")
            } else {
                return true
            }
        })
]