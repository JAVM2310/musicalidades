const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


function readProducts(){

    return JSON.parse(fs.readFileSync("./src/database/products.json"));
}

function writeProducts(a){
    fs.writeFileSync(productsFilePath, JSON.stringify(a, null, " "))
}



function addProduct(newProduct){
    let arr = this.readProducts()
    arr.push(newProduct)
    this.writeProducts(arr)
}

function create(product, imagenes){
    
    let lastProduct = products.slice(-1)[0];
    let lastId = lastProduct.id + 1;
    console.log(imagenes);

    let nombresImagenes = [];
    for (let i=0; i<imagenes.length; i++){
        nombresImagenes[i] = '/products/' + imagenes[i].filename;
        //console.log(nombresImagenes);
    }
    
    let newProduct = {
        id: lastId,
        categoria: product.categoria,
        name: product.name,
        shortDesc: product.shortDesc,
        longDesc: product.longDesc,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        marca: product.marca,
        image: nombresImagenes,
        /******  PARA AGREGAR IMGS 1 X 1 ******/
        // image0: nombresImagenes[0],
        // image1: nombresImagenes[1],
        // image2: nombresImagenes[2]
    }
    this.addProduct(newProduct);
}


let functions = {
    readProducts,
    writeProducts,
    addProduct,
    create,
}

module.exports = functions;