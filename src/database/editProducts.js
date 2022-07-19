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


function createProduct(product, imagenes){
    
    let lastProduct = products.slice(-1)[0];
    let lastId = lastProduct.id + 1;
    //console.log(imagenes);

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

function editProduct(editedProduct, imagenes){

    //let nombresImagenes = [];
    // for (let i=0; i<imagenes.length; i++){
    //     nombresImagenes[i] = '/products/' + imagenes[i].filename;
    //     //console.log(nombresImagenes);
    // }
    
    
    console.log(editedProduct);

    //fs.writeFileSync(productsFilePath, JSON.stringify(editedProduct, null, " "))
}

function deleteProduct(id){
    let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    console.log(" lista de productos");
    console.log(products);
    let chosenProductIndex = products.findIndex(product => product.id == id)
    products.splice(chosenProductIndex, 1)
    console.log("lista de productos despues de borrar");
    console.log(products);
    writeProducts(products)
}

let functions = {
    readProducts,
    writeProducts,
    editProduct,
    addProduct,
    createProduct,
    deleteProduct
}

module.exports = functions;