const express = require('express');
const router = express.Router();
const path = require('path');
const db = require("../database/models/index")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const api = {
    checkearDisponibilidad: (req, res) => {
        console.log("check");
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

    count: (req, res) => {
        //debe devolver cantidad de usuarios en la base
    },

    users: (req, res) =>{
        //debe devolver un array con: id, nombre, email y detail (url para obtener el detalle)
    },

    detalle: (req, res) =>{
        //se llega por api/users/:id
        //debera devolver un objeto literal con: una propiedad por cada campo en la base, url de la imagen de perfil, no traer informacion sensible (password, categoria)
    },
}   

module.exports = api