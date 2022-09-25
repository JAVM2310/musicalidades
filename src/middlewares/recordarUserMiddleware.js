const db = require("../database/models");

function recordarUserMiddleware(req,res,next){
    next();
    
    if(req.cookies.recordarme != undefined && !req.session.usuariosLogueado){
        db.Usuario.findOne({
            where: {
                email: req.cookies.recordarme,
            }
        }).then((resultado)=>{
            req.session.usuariosLogueado = resultado;
        })
    }
}

module.exports = recordarUserMiddleware;