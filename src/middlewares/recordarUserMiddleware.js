const db = require("../database/models");

function recordarUserMiddleware(req,res,next){
    next();
    if(req.cookie.recordarUsuario != undefined && req.session.usuarioLogueado == undefined){

        db.Producto
        
    }
}