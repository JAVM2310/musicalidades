function verificarUsuarioMiddleware(req, res, next){
    if (req.params.id == req.session.usuariosLogueado.id) {
        next()
    } else {
        return res.redirect("/signout")
    }
}

module.exports = verificarUsuarioMiddleware