const express = require("express");

const routes = require("./router/index");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en el body
app.use(express.json());

app.get("/", function(req, res){
    return res.json({mensaje: "Bienvenido a mi Proyecto backend API"});
});

// Rutas de la API
app.use("/api", routes);

// Ruta no encontrada
app.use(function(req, res){
    return res.status(404).json({
        ok: false,
        mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    });
});

// Manejador de errores
app.use(function(err, req, res, next){
    console.error(err);
    return res.status(500).json({
        ok: false,
        mensaje: "Error interno del servidor"
    });
});

app.listen(PORT, function(){
    console.log(`Servidor iniciado en: http://127.0.0.1:${PORT}`);
});
