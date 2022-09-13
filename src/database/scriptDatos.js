const db = require("./models/index");
const path = require('path');
const fs = require("fs");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const usersFilePath = path.join(__dirname, '../database/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../database/products-modificado.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

db.Marca.bulkCreate([
    {
        nombre: "Yamaha"
    },
    {
        nombre: "Knight"
    },
    {
        nombre: "Vox"
    },
    {
        nombre: "Ibanez"
    },
    {
        nombre: "Fender"
    },
    {
        nombre: "Jean Baptiste"
    },
    {
        nombre: "SKB"
    },
    {
        nombre: "Samson"
    }
])
.then(()=>{

    db.Categoria.bulkCreate([
        {
            tipo: "Cuerdas"
        },
        {
            tipo: "Teclas"
        },
        {
            tipo: "Percusión"
        },
        {
            tipo: "Vientos"
        },
        {
            tipo: "Sin Categoria"
        },
    ])
})
.then(()=>{
    
    users.forEach(user => {
        user.codPostal = user.codigo
        delete user.codigo
        user.permisos = user.tipo
        delete user.tipo
        delete user.passwordRepetida
        user.direccion = "callefalsa 123"
    });
    
    db.Usuario.bulkCreate(users)
})  

.then(()=>{
    
    products.forEach(product => {
        product.imagenes = JSON.stringify(product.imagenes)
    })
    
    db.Producto.bulkCreate(products)
})



