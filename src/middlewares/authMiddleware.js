function authMiddleware(req, res, next){
    if(req.session.usuariosLogueado){
        next();
    }else{
        return res.redirect('/login');
    }
}

module.exports = authMiddleware;