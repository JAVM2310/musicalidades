const db = require("../database/models");

function recordarUserMiddleware(req,res,next){
    next();
    
    console.log("llegas acá?")

    if(req.cookies.recordarme != undefined && !req.session.usuariosLogueado){
        db.Usuario.findOne({
            where: {
                email: req.cookies.recordarme,
            }
        }).then((resultado)=>{

            if(resultado.email == req.cookies.recordarme){
                req.session.usuariosLogueado = resultado;
                console.log("yyyy acá?")
                console.log(req.session.usuariosLogueado)

            }
        })
    }
}

module.exports = recordarUserMiddleware;