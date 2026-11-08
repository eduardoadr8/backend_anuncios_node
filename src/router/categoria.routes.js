const express = require("express");

const categoriaController = require("../controllers/categoria.controller");

const router = express.Router();

// CRUD categoria (sin BD)
router.get("/", categoriaController.listarCategorias);
router.get("/:id", categoriaController.obtenerCategoria);
router.post("/", categoriaController.crearCategoria);
router.put("/:id", categoriaController.actualizarCategoria);
router.delete("/:id", categoriaController.eliminarCategoria);

module.exports = router;
