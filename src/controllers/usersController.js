const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
let bcrypt = require('bcryptjs');
const multer = require('multer');

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
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        let chosenUserIndex = users.findIndex(user => user.email == req.body.email);
        if (chosenUserIndex < 0){
            const error = "El usuario debe existir";
            console.log(error)
            return res.render('./users/login', {titulo: 'login', error});
        }    
        let chosenUser = users[chosenUserIndex]; 
        

        if (!bcrypt.compareSync(req.body.password, chosenUser.password)){
            const error = "La contraseña no es correcta";
            console.log(error)
            return res.render('./users/login', {titulo: 'login', error});
        }
        delete chosenUser.password;
        delete chosenUser.passwordRepetida;
        req.session.usuariosLogueado = chosenUser;

        //console.log(chosenUser);
        
        console.log(req.session.usuariosLogueado);

        return res.redirect('/');

    },
    registered: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); 
        let titulo = "Login";

        if (users.findIndex(user => user.email == req.body.email) !== -1){
            const error = "Ese mail ya está registrado"
            return res.render('./users/register', {titulo: titulo, error});
        }

        let user = req.body;
        console.log(user);
            
        let lastUser = users.slice(-1)[0];
        let lastIdUser = lastUser.id + 1;
        let nombreImagen = '';
        if(req.file != undefined){
            nombreImagen = '/users/' + req.file.filename;
        }else{
            nombreImagen = '/users/default.jpg';
        }
        console.log(nombreImagen);
            
            let newUser = {
                id: lastIdUser,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                passwordRepetida: bcrypt.hashSync(req.body.passwordRepetida, 10),
                pais: req.body.pais,
                provincia: req.body.provincia,
                ciudad: req.body.ciudad,
                codigo: req.body.codigo,
                fechaNac: req.body.fechaNac,
                avatar: nombreImagen,
                tipo: 0
            }
            
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "))
            
        return res.redirect("/login");
    },

    signOut: (req, res) => {
        delete req.session.usuariosLogueado
        res.redirect("/")
    }

    // profile: (req, res) => {
    //     let titulo = "Mi Perfil";
    //     res.render('users//profile', {titulo, user: req.session.usuariosLogueado});
    // },
};



module.exports = controller;