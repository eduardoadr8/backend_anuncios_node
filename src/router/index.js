const express = require("express");

const categoriaRoutes = require("./categoria.routes");
const publicacionRoutes = require("./publicacion.routes");

const Route = express.Router();

// CRUD categoria sin BD
Route.use("/categorias", categoriaRoutes);

// CRUD publicacion sin BD
Route.use("/publicaciones", publicacionRoutes);

module.exports = Route;
