function guestMiddleware(req, res, next){
    if(!req.session.usuariosLogueado){
        next();
    }else{
        return res.redirect('/myprofile');
    }
}

module.exports = guestMiddleware;