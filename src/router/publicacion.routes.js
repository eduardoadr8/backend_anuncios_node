const express = require("express");

const publicacionController = require("../controllers/publicacion.controller");

const router = express.Router();

// CRUD publicacion (sin BD)
router.get("/", publicacionController.listarPublicaciones);
router.get("/:id", publicacionController.obtenerPublicacion);
router.post("/", publicacionController.crearPublicacion);
router.put("/:id", publicacionController.actualizarPublicacion);
router.delete("/:id", publicacionController.eliminarPublicacion);

module.exports = router;
