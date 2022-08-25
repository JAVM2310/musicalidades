const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
let bcrypt = require('bcryptjs');
const multer = require('multer');

const db = require("../database/models/index")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const usersFilePath = path.join(__dirname, '../database/users.json');
let error = '';


const controller = {

    login: (req, res) => {
        let titulo = "Login"
        res.render('./users/login', {titulo: titulo, error});
    },

    register: (req, res) => {
        let titulo = "Registro"
        res.render('./users/register', {titulo: titulo, error});
    },

    logueado: (req, res) => {

        /* db.Usuario.findAll()
        .then(function(users){
            console.log('Largo de Users: '+users.length)
            let chosenUserIndex;
            for(i=0; i<users.length; i++){
                if(users[i].dataValues.email == req.body.email){
                    chosenUserIndex = users[i].dataValues.id
                    console.log(chosenUserIndex)
                }
            }
            if (!chosenUserIndex){
                const error = "El usuario debe existir";
                console.log(error)
                return res.render('./users/login', {titulo: 'login', error});
            }

            let chosenUser = users[chosenUserIndex];
            console.log('1111111111'+chosenUser)
            console.log('222222222222222'+chosenUser.dataValues)

            console.log(chosenUser.dataValues.password)
            console.log(req.body.password)

            if (!bcrypt.compareSync(req.body.password, chosenUser.dataValues.password)){
                const error = "La contraseña no es correcta";
                console.log(error)
                return res.render('./users/login', {titulo: 'login', error});
            }
            delete chosenUser.dataValues.password;
            req.session.usuariosLogueado = chosenUser;
            
            console.log(req.session.usuariosLogueado);

            return res.redirect('/'); 

        })  */

        db.Usuario.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then(function(resultado){
/*             console.log(resultado.dataValues);
            console.log('stringy'+JSON.stringify(resultado));
            console.log(resultado);
 */
            if (resultado == null){
                const error = "No existe el Usuario";
                console.log(error)
                return res.render('./users/login', {titulo: 'login', error});
            }
            if (!bcrypt.compareSync(req.body.password, resultado.dataValues.password)){
                const error = "La contraseña no es correcta";
                console.log(error)
                return res.render('./users/login', {titulo: 'login', error});
            }
            delete resultado.dataValues.password;
            req.session.usuariosLogueado = resultado.dataValues;

            return res.redirect('/'); 

        })

    },
    registered: (req, res) => {
        
        let titulo = "Login";
        db.Usuario.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then(function(resultado){
            if (resultado){
                const error = "Ese mail ya está registrado"
                return res.render('./users/register', {titulo: titulo, error});
            }else{
                let nombreImagen = '';
            if(req.file != undefined){
                nombreImagen = '/users/' + req.file.filename;
            }else{
                nombreImagen = '/users/default.png';
            }
            console.log(nombreImagen);
            db.Usuario.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                pais: req.body.pais,
                provincia: req.body.provincia,
                ciudad: req.body.ciudad,
                codPostal: req.body.codigo,
                fechaNac: req.body.fechaNac,
                avatar: nombreImagen,
                permisos: 0
            })
            return res.redirect("/login");
            }
        })
    },

    signOut: (req, res) => {
        delete req.session.usuariosLogueado
        res.redirect("/")
    },

    profile: (req, res) => {
        res.render('./users/myprofile', {titulo: "Perfil", user: req.session.usuariosLogueado});
    },

    modifyUser: (req, res) => {//ESTE ESTÁ OK, HAY QUE RETOCAR LA VISTA PARA QUE QUEDE MÁS BELLA
        
        db.Usuario.findByPk(req.params.id)
        .then((usuario) =>{
            let error = ""
            usuarioEditando = usuario.dataValues
            res.render('./users/modifyuser', {titulo: "Editar Usuario", userToEdit:usuarioEditando, user: req.session.usuariosLogueado, error});
        })

    },

    profileEdition: (req, res) => {// ESTE ESTÁ OK, PERO AL REDIRIGIR NO TRAE LOS DATOS NUEVOS
        let avatar = "";
        db.Usuario.findOne({
            where: {
                id: req.params.id,
            }
        })
        .then((resultado)=>{
            avatar = resultado.dataValues.avatar;
            if(resultado.dataValues.email != req.body.email){
                db.Usuario.findAll()
                .then((users)=>{
                    for(i=0; i<users.length; i++){
                        if(users[i].dataValues.email == req.body.email){
                            let error = "El email " + users[i].dataValues.email + " ya existe. Debe elegir otro email";
                            console.log(error)
                            return res.render('./users/modifyuser', {titulo: 'Editar Usuario', user: req.session.usuariosLogueado, error});
                        }
                    }
                })
            }
        }).then(()=>{
                if(req.file){
                    fs.unlink(path.join(__dirname, "../../public/img/") + avatar, log => console.log("Se borró el archivo: " + avatar + " en la carpeta: " + path.join(__dirname, "../../public/img/users/")))
                    avatar = '/users/' + req.file.filename;
                }
                db.Usuario.update({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    pais: req.body.pais,
                    provincia: req.body.provincia,
                    ciudad: req.body.ciudad,
                    codPostal: req.body.codPostal,
                    fechaNac: req.body.fechaNac,
                    avatar: avatar
                },
                {
                    where:{
                        id: req.params.id
                    }
                })
                .then(()=>{
                    res.render("users/myprofile", {titulo: "Perfil", user: req.session.usuariosLogueado});
                    //res.redirect("/myprofile");
                })
            })
    },
    delete(req, res){//ESTE ESTÁ OK
        let user = req.session.usuariosLogueado;
        
        db.Usuario.destroy({
                where:{
                    id: user.id
                }
        })
        .then(()=>{
            delete req.session.usuariosLogueado;
            res.redirect("/")
        })
    },
};



module.exports = controller;