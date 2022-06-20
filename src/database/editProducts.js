const fs = require("fs")

function readProducts(){
    return JSON.parse(fs.readFileSync("./src/database/products.json"))
}

function writeProducts(a){
    fs.writeFileSync("./src/database/products.json", JSON.stringify(a))
}

function addProduct(newProduct){
    let arr = this.readProducts()
    arr.push(newProduct)
    this.writeProducts(arr)
}

function create(product){
    let newProduct = {
        name: product.name,
        shortDesc: product.shortDesc,
        longDesc: product.longDesc,
        price: product.price,
        Stock: product.Stock
    }
    this.addProduct(newProduct)
}


let functions = {
    readProducts,
    writeProducts,
    addProduct,
    create,
}

module.exports = functions;