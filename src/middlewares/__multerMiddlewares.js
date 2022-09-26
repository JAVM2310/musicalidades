const multer = require("multer");

const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes("jpeg") || (file.mimetype).includes("png") || (file.mimetype).includes("jpg") || (file.mimetype).includes("gif")) {
        console.log(file)
        cb(null, true);
    }
    else {
        console.log(file)
        cb(null, false)
        req.fileError = "ppp";
    }
}


const uploadFile = multer({
    fileFilter: fileFilter,
    storage: storage
})

module.exports = uploadFile;