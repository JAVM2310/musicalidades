const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

/************************** MIDDLEWARES *********************/

const authMiddleware = require('../middlewares/authMiddleware.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');
const verificarUsuarioMiddleware = require("../middlewares/verificarUsuarioMiddleware")

const validacionRegistroBack = require("../middlewares/validacionRegistroBack.js")
const validacionLoginBack = require("../middlewares/validacionLoginBack.js")
const validacionModificarUsuario = require("../middlewares/validacionModificarUsuarioBack")
const validacionCambiarPassword = require("../middlewares/validacionCambiarPasswordBack")

/************************** MULTER **************************/

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/users'));
    },
    filename: (req, file, cb) => {
        const nameImgUser = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, nameImgUser);
    }
});

const upload = multer({storage});

/* CON ARCHIVO CONTROLLER*/

const usersController = require ('../controllers/usersController.js');

router.get('/login', guestMiddleware, usersController.login);
router.get('/register', guestMiddleware, usersController.register);
router.post('/login', validacionLoginBack, usersController.logueado); 
router.post('/register', upload.single('avatar'), validacionRegistroBack, usersController.crearUsuario);
/* router.get("/disponible/:email", usersController.checkearDisponibilidad) */
router.get("/signout", usersController.signOut) 
router.get("/myprofile", authMiddleware, usersController.profile)

router.get("/cambiarPassword", authMiddleware, usersController.cambiarPasswordGet)
router.patch("/cambiarPassword/:id", authMiddleware, verificarUsuarioMiddleware, validacionCambiarPassword, usersController.cambiarPasswordPost)


router.get("/modifyuser/:id", usersController.modifyUser);
router.patch("/myprofile/:id", authMiddleware, verificarUsuarioMiddleware, upload.single('avatar'), validacionModificarUsuario, usersController.profileEdition)

router.get("/deleteuser/:id", usersController.borrar)

module.exports = router;