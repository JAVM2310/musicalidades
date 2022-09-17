const express = require('express');
const router = express.Router();
const path = require('path');


const api = require("../api/usersApi")


router.get("/disponible/:email", api.checkearDisponibilidad)

module.exports = router