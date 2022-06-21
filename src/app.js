const express = require("express");
const { route } = require("express/lib/application");
const app = express()
const path = require("path")
const methodOverride = require("method-override");
methodOverride("_method")

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set("views",__dirname + "/views");
app.use(express.urlencoded({extended: false}));
app.use(express.json());


const rutasIndex = require('./routes/indexRoute');
const rutastienda = require('./routes/tiendaRoute');
const rutasUsers = require('./routes/usersRoute');

app.use('/', rutasIndex);
app.use('/', rutasUsers);
app.use('/tienda', rutastienda);

app.listen(process.env.PORT || 3000, () => {console.log("levantado el servidor en el puerto 3000")
});