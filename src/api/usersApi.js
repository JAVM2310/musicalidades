const express = require('express');
const router = express.Router();
const path = require('path');
const db = require("../database/models/index")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const api = {

    // devuelve true si el mail esta disponible y false si ya esta registrado
    checkearDisponibilidad: (req, res) => {
        mail = req.params.email
        db.Usuario.findOne({
            where:{
                email: mail
            }
        })
        .then((result)=>{
            if (result == null){
                return res.json(true)
            } else {
                return res.json(false)
            }
        })
    },

    // devuelve un objeto con 2 propiedades, count y users
    // count es un numero con la cantidad de usuarios registrados y users es un array con id, nombre, email y una url para mas info de cada usuario
    users: (req, res) =>{
        let respuesta = {}
        db.Usuario.count()
        .then(result => {
            respuesta.count = result
            db.Usuario.findAll()
            .then(result =>{
                respuesta.users = result.map(usuario =>{
                    delete usuario.dataValues.password
                    delete usuario.dataValues.pais
                    delete usuario.dataValues.provincia
                    delete usuario.dataValues.ciudad
                    delete usuario.dataValues.direccion
                    delete usuario.dataValues.codPostal
                    delete usuario.dataValues.fechaNac
                    delete usuario.dataValues.avatar
                    delete usuario.dataValues.permisos
                    usuario.dataValues.name = usuario.dataValues.nombre + " " + usuario.dataValues.apellido
                    delete usuario.dataValues.nombre
                    delete usuario.dataValues.apellido
                    usuario.dataValues.detail = "/api/users/" + usuario.dataValues.id
                    return usuario.dataValues
                })
                return res.json(respuesta)
            })
        })
    },

    // devuelve un objeto con toda la informacion (sin password o categoria) de un usuario especifico
    userDetail: (req, res) =>{
        db.Usuario.findByPk(req.params.id)
        .then(result => {
            if (result !=null){
                delete result.dataValues.permisos
                delete result.dataValues.password
                return  res.json(result.dataValues)
            } else {
                return res.json("no se encontro el usuario en la base")
            }
        })
    },
}   

module.exports = api