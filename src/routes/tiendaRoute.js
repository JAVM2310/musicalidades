const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const adminMiddleware = require('../middlewares/adminMiddleware.js');


/************************** MULTER **************************/

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/products'));
    },
    filename: (req, file, cb) => {
        const nameImgProduct = 'producto-' + Date.now() + path.extname(file.originalname);
        cb(null, nameImgProduct);
    }
});

const upload = multer({storage});



/************************** CONTROLLERS **************************/

const tiendaController = require ('../controllers/tiendaController');



/************************** ROUTES **************************/

router.get('/', tiendaController.tienda);
router.get('/productDetail/:id', tiendaController.productDetail);
router.get('/productCart', tiendaController.productCart);
router.get("/newProduct", adminMiddleware, tiendaController.newProduct);
router.post("/newProduct", upload.array('images'), tiendaController.createProduct);
router.get("/modifyProduct/:id", adminMiddleware, tiendaController.modifyProduct);
router.put("/productDetail/:id", adminMiddleware, upload.array('images'), tiendaController.modify)
router.get("/deleteProduct/:id", adminMiddleware, tiendaController.delete)



module.exports = router;