function adminMiddleware(req, res, next){
    if (req.session.usuariosLogueado) {
        if (req.session.usuariosLogueado.tipo == 9){
            next();
        }else{
            return res.redirect('/')
        }
    }else{
        return res.redirect('/')
    }
}

module.exports = adminMiddleware;