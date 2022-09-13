const { body } = require("express-validator");
const fs = require("fs");

module.exports = [

    body('categoria').notEmpty().withMessage('Debes completar tu nombre'),
    body('marca').notEmpty().withMessage('Debes completar tu email').bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('marcaNuevaNombre').notEmpty().withMessage('Debes escribir un mensaje'),
    body('name').notEmpty().withMessage('Debes completar tu nombre'),
    body('shortDesc').notEmpty().withMessage('Debes completar tu email').bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('longDesc').notEmpty().withMessage('Debes escribir un mensaje'),
    body('price').notEmpty().withMessage('Debes escribir un mensaje'),
    body('discount').notEmpty().withMessage('Debes completar tu nombre'),
    body('stock').notEmpty().withMessage('Debes completar tu email').bail().isEmail().withMessage('Debes ingresar un email válido'),
    body('file').notEmpty().withMessage('Debes escribir un mensaje'),





    body("title").notEmpty().withMessage("El titulo no puede estar vacio!").isLength({min:2, max:50}).withMessage("El titulo debe tener entre 2 y 50 caracteres"),
    body("rating").notEmpty().withMessage("El rating no puede estar vacio!").isFloat({min:1, max:10}).withMessage("El rating debe estar entre 1-10."),
    body("awards").notEmpty().withMessage("Los premios no pueden estar vacios!").isInt({min:0}).withMessage("El rating debe ser 0 o más."),
    body("length").notEmpty().withMessage("La duración no puede estar vacia!").isFloat({min:60}).withMessage("La duración debe ser mayor a 60."),
    body("release_date").isDate().withMessage("La fecha no puede venir vacia!"),
    body("genre_id").notEmpty().withMessage("El genero no puede venir vacio!"),
    body("file").custom((value, {req}) => {
        let files = req.files
        let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"]

        
        if (files == undefined) {
            throw new Error("Adjunte una image con formato: " + acceptedExtensions + " y peso máximo 10mb.")
        }
        /* else if (files.size > (1024 * 1024 * 10)) {
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.log(err)
                }
            })
            throw new Error("Adjunte una image con formato: " + acceptedExtensions + " y peso máximo 10mb.")
        } */
        return true
    })

]