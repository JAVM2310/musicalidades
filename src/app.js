const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require('express-session');
const recordarUserMiddleware = require("./middlewares/recordarUserMiddleware.js");
const cookieParser = require('cookie-parser')

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
//app.set("views",__dirname + "/views"); //app.set('views',path.resolve(__dirname, 'views'));
app.use(session({
    secret: 'nuestro texto secreto',
    resave: false,
    saveUninitialized: false,
}))
app.use(cookieParser());
app.use(recordarUserMiddleware)

const rutasIndex = require('./routes/indexRoute');
const rutastienda = require('./routes/tiendaRoute');
const rutasUsers = require('./routes/usersRoute');
const rutasApi = require("./routes/apiRoute")

app.use('/', rutasIndex);
app.use('/', rutasUsers);
app.use('/tienda', rutastienda);
app.use("/api", rutasApi)



//-----------------404------------------------//
app.use((req,res,next)=>{
    res.status(404).render('not-found');
    next();
});

//--------------SERVER-----------------//
app.listen(process.env.PORT || 3001, () => {console.log("levantado el servidor en el puerto 3001")
});