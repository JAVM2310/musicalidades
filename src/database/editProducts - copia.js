const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../database/products.json');
const jsonProducts = fs.readFileSync(productsFilePath, 'utf-8');

function readProducts(){
    // console.log(jsonProducts);
    if(jsonProducts == ""){
        products = [];
    }else {
        let products = JSON.parse(fs.readFileSync("./src/database/products.json"));
    }
}

function writeProducts(a){
    if(jsonProducts == ""){
        products = [];
        fs.writeFileSync(productsFilePath, JSON.stringify(a, null, " "))
    }else {
        fs.writeFileSync(productsFilePath, JSON.stringify(a, null, " "))
    }
}



function addProduct(newProduct){
    let arr = this.readProducts()
    //arr.push(newProduct)
    this.writeProducts(arr)
}

function create(product){
    
    if(jsonProducts == ""){
        products = [];
        let newProduct = {
            id: "1",
            name: product.name,
            shortDesc: product.shortDesc,
            longDesc: product.longDesc,
            price: product.price,
            Stock: product.Stock,
            image: "/products/default.png"
        }
        this.addProduct(newProduct);
    }else {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let last = products.slice(-1)[0];
        let lastId = Number(last.id) + 1; 
        let newProduct = {
            id: lastId.toString(),
            name: product.name,
            shortDesc: product.shortDesc,
            longDesc: product.longDesc,
            price: product.price,
            Stock: product.Stock,
            image: "/products/default.png"
        }
        this.addProduct(newProduct);  
    };
    
    
    
}


let functions = {
    readProducts,
    writeProducts,
    addProduct,
    create,
}

module.exports = functions;