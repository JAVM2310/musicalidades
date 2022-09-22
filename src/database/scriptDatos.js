const db = require("./models/index");
const path = require('path');
const fs = require("fs");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const usersFilePath = path.join(__dirname, '../database/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../database/products-new.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

db.Marca.bulkCreate([
    {
        nombre: "Yamaha" //1
    },
    {
        nombre: "Knight" //2
    },
    {
        nombre: "Vox" //3
    },
    {
        nombre: "Ibanez" //4
    },
    {
        nombre: "Fender" //5
    },
    {
        nombre: "Jean Baptiste" //6
    },
    {
        nombre: "SKB" //7
    },
    {
        nombre: "Samson" //8
    },
    {
        nombre: "Essex" //9
    },
    {
        nombre: "Casio" //10
    },
    {
        nombre: "Maono" //11
    },
    {
        nombre: "Suzuki" //12
    },
    {
        nombre: "Bamboo" //13
    },
    {
        nombre: "Hoffmann" //14
    },
    {
        nombre: "Vintage" //15
    },
    {
        nombre: "Lp" //16
    },
    {
        nombre: "Fonseca" //17
    },
    {
        nombre: "Dadi" //18
    },
    {
        nombre: "Nacional" //19
    },
    {
        nombre: "Santiaguito" //20
    },
    {
        nombre: "Laney" //21
    },
    {
        nombre: "Premier" //22
    },
    {
        nombre: "Dunlop" //23
    },
    {
        nombre: "Blackstar" //24
    },
    {
        nombre: "Hohner" //25
    },
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
        product.imagenes = JSON.stringify(product.image)
        delete product.image
        switch (product.marca) {
            case "Yamaha":
                product.marca_id = 1
                break;
            case "Knight":
                product.marca_id = 2
                break;
            case "Vox":
                product.marca_id = 3
                break;
            case "Ibanez":
                product.marca_id = 4
                break;
            case "Fender":
                product.marca_id = 5
                break;
            case "Jean Baptiste":
                product.marca_id = 6
                break;
            case "SKB":
                product.marca_id = 7
                break;
            case "Samson":
                product.marca_id = 8
                break;
            case "Essex":
                product.marca_id = 9
                break;
            case "Casio":
                product.marca_id = 10
                break;
            case "Maono":
                product.marca_id = 11
                break;
            case "Suzuki":
                product.marca_id = 12
                break;
            case "Bamboo":
                product.marca_id = 13
                break;
            case "Hoffmann":
                product.marca_id = 14
                break;
            case "Vintage":
                product.marca_id = 15
                break;
            case "Lp":
                product.marca_id = 16
                break;
            case "Fonseca":
                product.marca_id = 17
                break;
            case "Dadi":
                product.marca_id = 18
                break;
            case "Nacional":
                product.marca_id = 19
                break;
            case "Santiaguito":
                product.marca_id = 20
                break;
            case "Laney":
                product.marca_id = 21
                break;
            case "Premier":
                product.marca_id = 22
                break;
            case "Dunlop":
                product.marca_id = 23
                break;
            case "Blackstar":
                product.marca_id = 24
                break;
            case "Hohner":
                product.marca_id = 25
                break;
        }
        delete product.marca
        switch (product.categoria) {
            case "Cuerdas":
                product.categoria_id = 1
                break;
            case "Teclas":
                product.categoria_id = 2
                break;
            case "Percusión":
                product.categoria_id = 3
                break;
            case "Vientos":
                product.categoria_id = 4
                break;
            case "Sin categoría":
                product.categoria_id = 5
                break;
        }
        delete product.categoria
        product.nombre = product.name
        delete product.name
        product.descripcion = product.shortDesc
        delete product.shortDesc
        product.descLarga = product.longDesc
        delete product.longDesc
        product.precio = Number(product.price)
        delete product.price
        product.descuento = Number(product.discount)
        delete product.discount
        product.stock = Number(product.stock)
        product.descLarga = "a"
    })
    
    db.Producto.bulkCreate(products)
})


