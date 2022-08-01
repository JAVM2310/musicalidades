const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

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

router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.post('/login', usersController.logueado); 
router.post('/register', upload.single('avatar'), usersController.registered);
router.get("/signout", usersController.signOut) 
//router.get('/profile', usersController.profile);


module.exports = router;