const express = require("express");
const { route } = require("express/lib/application");
const app = express()
const path = require("path")

app.use(express.static('./public'));
app.set('view engine', 'ejs');


const rutasIndex = require('./routes/indexRoute');
const rutasProduct = require('./routes/usersRoute');
const rutasUsers = require('./routes/productRoute');


/*
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "./views/index.html"))
});


app.get("/login", (req, res)=>{
    res.sendFile(path.join(__dirname, "./views/login.html"))
});

app.get("/productCart", (req, res)=>{
    res.sendFile(path.join(__dirname, "./views/productCart.html"))
});

app.get("/productDetail", (req, res)=>{
    res.sendFile(path.join(__dirname, "./views/productDetail.html"))
});

app.get("/register", (req, res)=>{
    res.sendFile(path.join(__dirname, "./views/register.html"))
});*/



app.listen(process.env.PORT || 3000, () => {console.log("levantado el servidor en el puerto 3000")
});


app.use('/', rutasIndex);
app.use('/', rutasUsers);
app.use('/', rutasProduct);