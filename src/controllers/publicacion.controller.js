// Controlador de Publicacion (sin Base de Datos)
// Los datos se almacenan en memoria mientras el servidor esta en ejecucion.

let publicaciones = [
    {
        id: 1,
        titulo: "Toyota Corolla 2020",
        descripcion: "Vehiculo en excelente estado, un solo dueño",
        precio: 18500,
        categoriaId: 1,
        ubicacion: "Lima",
        estado: "activo",
        fechaPublicacion: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

let ultimoId = 1;

const ESTADOS_VALIDOS = ["activo", "inactivo", "vendido"];

// GET /api/publicaciones
const listarPublicaciones = function (req, res) {
    const { categoriaId, estado, q } = req.query;
    let resultado = publicaciones.slice();

    if (categoriaId !== undefined) {
        const idCategoria = Number(categoriaId);
        resultado = resultado.filter(function (p) {
            return p.categoriaId === idCategoria;
        });
    }

    if (estado !== undefined) {
        resultado = resultado.filter(function (p) {
            return p.estado === estado;
        });
    }

    if (q !== undefined && String(q).trim() !== "") {
        const texto = String(q).trim().toLowerCase();
        resultado = resultado.filter(function (p) {
            return p.titulo.toLowerCase().includes(texto) ||
                p.descripcion.toLowerCase().includes(texto);
        });
    }

    return res.status(200).json({
        ok: true,
        total: resultado.length,
        datos: resultado
    });
};

// GET /api/publicaciones/:id
const obtenerPublicacion = function (req, res) {
    const id = Number(req.params.id);
    const publicacion = publicaciones.find(function (p) { return p.id === id; });

    if (!publicacion) {
        return res.status(404).json({
            ok: false,
            mensaje: `No existe la publicacion con id ${req.params.id}`
        });
    }

    return res.status(200).json({ ok: true, datos: publicacion });
};

// POST /api/publicaciones
const crearPublicacion = function (req, res) {
    const { titulo, descripcion, precio, categoriaId, ubicacion, estado } = req.body || {};

    if (!titulo || String(titulo).trim() === "") {
        return res.status(400).json({
            ok: false,
            mensaje: "El campo 'titulo' es obligatorio"
        });
    }

    if (precio === undefined || precio === null || isNaN(Number(precio)) || Number(precio) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: "El campo 'precio' es obligatorio y debe ser un numero mayor o igual a 0"
        });
    }

    if (categoriaId === undefined || categoriaId === null || isNaN(Number(categoriaId))) {
        return res.status(400).json({
            ok: false,
            mensaje: "El campo 'categoriaId' es obligatorio y debe ser numerico"
        });
    }

    if (estado !== undefined && !ESTADOS_VALIDOS.includes(estado)) {
        return res.status(400).json({
            ok: false,
            mensaje: `El campo 'estado' solo acepta: ${ESTADOS_VALIDOS.join(", ")}`
        });
    }

    const ahora = new Date().toISOString();
    const nuevaPublicacion = {
        id: ++ultimoId,
        titulo: String(titulo).trim(),
        descripcion: descripcion ? String(descripcion).trim() : "",
        precio: Number(precio),
        categoriaId: Number(categoriaId),
        ubicacion: ubicacion ? String(ubicacion).trim() : "",
        estado: estado || "activo",
        fechaPublicacion: ahora,
        createdAt: ahora,
        updatedAt: ahora
    };

    publicaciones.push(nuevaPublicacion);

    return res.status(201).json({
        ok: true,
        mensaje: "Publicacion creada correctamente",
        datos: nuevaPublicacion
    });
};

// PUT /api/publicaciones/:id
const actualizarPublicacion = function (req, res) {
    const id = Number(req.params.id);
    const indice = publicaciones.findIndex(function (p) { return p.id === id; });

    if (indice === -1) {
        return res.status(404).json({
            ok: false,
            mensaje: `No existe la publicacion con id ${req.params.id}`
        });
    }

    const { titulo, descripcion, precio, categoriaId, ubicacion, estado } = req.body || {};

    if (titulo !== undefined && String(titulo).trim() === "") {
        return res.status(400).json({
            ok: false,
            mensaje: "El campo 'titulo' no puede estar vacio"
        });
    }

    if (precio !== undefined && (isNaN(Number(precio)) || Number(precio) < 0)) {
        return res.status(400).json({
            ok: false,
            mensaje: "El campo 'precio' debe ser un numero mayor o igual a 0"
        });
    }

    if (categoriaId !== undefined && isNaN(Number(categoriaId))) {
        return res.status(400).json({
            ok: false,
            mensaje: "El campo 'categoriaId' debe ser numerico"
        });
    }

    if (estado !== undefined && !ESTADOS_VALIDOS.includes(estado)) {
        return res.status(400).json({
            ok: false,
            mensaje: `El campo 'estado' solo acepta: ${ESTADOS_VALIDOS.join(", ")}`
        });
    }

    if (titulo !== undefined) publicaciones[indice].titulo = String(titulo).trim();
    if (descripcion !== undefined) publicaciones[indice].descripcion = String(descripcion).trim();
    if (precio !== undefined) publicaciones[indice].precio = Number(precio);
    if (categoriaId !== undefined) publicaciones[indice].categoriaId = Number(categoriaId);
    if (ubicacion !== undefined) publicaciones[indice].ubicacion = String(ubicacion).trim();
    if (estado !== undefined) publicaciones[indice].estado = estado;

    publicaciones[indice].updatedAt = new Date().toISOString();

    return res.status(200).json({
        ok: true,
        mensaje: "Publicacion actualizada correctamente",
        datos: publicaciones[indice]
    });
};

// DELETE /api/publicaciones/:id
const eliminarPublicacion = function (req, res) {
    const id = Number(req.params.id);
    const indice = publicaciones.findIndex(function (p) { return p.id === id; });

    if (indice === -1) {
        return res.status(404).json({
            ok: false,
            mensaje: `No existe la publicacion con id ${req.params.id}`
        });
    }

    const publicacionEliminada = publicaciones.splice(indice, 1)[0];

    return res.status(200).json({
        ok: true,
        mensaje: "Publicacion eliminada correctamente",
        datos: publicacionEliminada
    });
};

module.exports = {
    listarPublicaciones,
    obtenerPublicacion,
    crearPublicacion,
    actualizarPublicacion,
    eliminarPublicacion
};
