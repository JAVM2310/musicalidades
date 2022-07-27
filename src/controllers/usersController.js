const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require("fs");
let bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let titulo = "";

const controller = {

    login: (req, res) => {
        let titulo = "Login"
        res.render('./users/login', {titulo: titulo});
    },

    register: (req, res) => {
        let titulo = "Registro"
        res.render('./users/register', {titulo: titulo});
    },

    logueado: (req, res) => {
        let titulo = "Login"
        res.render('./users/login', {titulo: titulo});
    },
    registered: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); 
        let titulo = "Login";

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
                password: bcrypt.hashSync(req.body.password, 10),
                passwordRepetida: bcrypt.hashSync(req.body.passwordRepetida, 10),
                pais: req.body.pais,
                provincia: req.body.provincia,
                ciudad: req.body.ciudad,
                codigo: req.body.codigo,
                fechaNac: req.body.fechaNac,
                avatar: nombreImagen,
            }
        //console.log(newUser);
            
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "))
            
        res.redirect("/login");
        //res.send('hola');
    }
};



module.exports = controller;