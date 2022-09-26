const { body } = require("express-validator");
const fs = require("fs");

module.exports = [
    

/*     body('categoria').notEmpty().withMessage('Debes elegir una categoría'),
 */ /* body('marcaNuevaNombre').notEmpty().withMessage('Debes ingresar el Nombre de la Nueva Marca.').bail().isLength({ min: 2, max: 15 }).withMessage('El Nombre de la nueva Marca debe tener entre 2 y 15 caracteres'), */
    body('name').notEmpty().withMessage('Debes completar el Nombre del Producto').bail().isLength({ min: 10, max: 28 }).withMessage('El Nombre del Producto debe tener entre 10 y 28 caracteres'),
    body('shortDesc').notEmpty().withMessage('Debes completar la Breve Descripción').bail().isLength({ min: 20, max: 60 }).withMessage('La Breve Descripción debe tener entre 20 y 60 caracteres'),
    body('longDesc').notEmpty().withMessage('Debes completar la Descripción Detallada').bail().isLength({ min: 200 }).withMessage('La Descripción Detallada debe tener más de 200 caracteres'),
    body('price').notEmpty().withMessage('Debes completar el Precio').bail().isFloat({ min: 1}).withMessage('El Precio debe ser mayor a 0'),
    body('discount').notEmpty().withMessage('Debes completar el % de Descuento').bail().isInt({ min: 0, max: 100 }).withMessage('El % de Descuento debe ser un número entre 0 y 100'),
    body('stock').notEmpty().withMessage('Debes completar el Stock').bail().isInt({ min: 1}).withMessage('El Stock debe ser mayor a 0'),
    body('marcaNuevaNombre').custom((value, { req }) => {
        if (value == "" && req.body.marcaNueva == 1) {
            throw new Error("Debes escribir el Nombre de la Marca Nueva")
        }else{
            return true;
        }
    }), 
    body('categoria').custom(value => {
        if (value == -1) {
            throw new Error('Debes elegir una Categoría.');
        }
        return true;
    }),
    body('marca').custom(value => {
        if (value == -1) {
            throw new Error('Debes elegir una Marca.');
        }
        return true;
    }),

    body('images').custom((value, {req}) => {
        value = req.files

        if (value.length == 0){
            
            throw new Error ("Debes cargar al menos un archivo .jpg, .jpeg, .png o .gif")

        }else if(value.length > 0){

            for (let i = 0; i < value.length; i++) {
                let file = value[i];
                    if((/(.jpg)$/).test(file.originalname) || (/(.jpeg)$/).test(file.originalname) || (/(.png)$/).test(file.originalname) || (/(.gif)$/).test(file.originalname)){
                    } else {
                        return Promise.reject("Todos los archivos deben ser .jpg, .jpeg, .png o .gif")
                    }
            }
        }
        return true;
    }).bail(),
    
]