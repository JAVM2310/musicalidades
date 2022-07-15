const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');


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
router.get("/newProduct", tiendaController.newProduct);
router.post("/newProduct", upload.array('images'), tiendaController.createProduct);
router.get("/modifyProduct/:id", tiendaController.modifyProduct);
router.put("/productDetail/:id", tiendaController.modify)

/****me gustaria que una vez modificado te vaya a la pag del detalle del producto pero la voy a cagar si toco la ruta */

module.exports = router;