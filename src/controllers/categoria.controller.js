// Controlador de Categoria (sin Base de Datos)
// Los datos se almacenan en memoria mientras el servidor esta en ejecucion.

let categorias = [
    {
        id: 1,
        nombre: "Vehiculos",
        descripcion: "Autos, motos y repuestos",
        estado: "activo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        nombre: "Inmuebles",
        descripcion: "Casas, departamentos y terrenos",
        estado: "activo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

let ultimoId = 2;

// GET /api/categorias
const listarCategorias = function (req, res) {
    return res.status(200).json({
        ok: true,
        total: categorias.length,
        datos: categorias
    });
};

// GET /api/categorias/:id
const obtenerCategoria = function (req, res) {
    const id = Number(req.params.id);
    const categoria = categorias.find(function (c) { return c.id === id; });

    if (!categoria) {
        return res.status(404).json({
            ok: false,
            mensaje: `No existe la categoria con id ${req.params.id}`
        });
    }

    return res.status(200).json({ ok: true, datos: categoria });
};

// POST /api/categorias
const crearCategoria = function (req, res) {
    const { nombre, descripcion, estado } = req.body || {};

    if (!nombre || String(nombre).trim() === "") {
        return res.status(400).json({
            ok: false,
            mensaje: "El campo 'nombre' es obligatorio"
        });
    }

    const nombreNormalizado = String(nombre).trim().toLowerCase();
    const existe = categorias.some(function (c) {
        return c.nombre.toLowerCase() === nombreNormalizado;
    });

    if (existe) {
        return res.status(409).json({
            ok: false,
            mensaje: `Ya existe una categoria con el nombre '${nombre}'`
        });
    }

    const ahora = new Date().toISOString();
    const nuevaCategoria = {
        id: ++ultimoId,
        nombre: String(nombre).trim(),
        descripcion: descripcion ? String(descripcion).trim() : "",
        estado: estado === "inactivo" ? "inactivo" : "activo",
        createdAt: ahora,
        updatedAt: ahora
    };

    categorias.push(nuevaCategoria);

    return res.status(201).json({
        ok: true,
        mensaje: "Categoria creada correctamente",
        datos: nuevaCategoria
    });
};

// PUT /api/categorias/:id
const actualizarCategoria = function (req, res) {
    const id = Number(req.params.id);
    const indice = categorias.findIndex(function (c) { return c.id === id; });

    if (indice === -1) {
        return res.status(404).json({
            ok: false,
            mensaje: `No existe la categoria con id ${req.params.id}`
        });
    }

    const { nombre, descripcion, estado } = req.body || {};

    if (nombre !== undefined) {
        if (String(nombre).trim() === "") {
            return res.status(400).json({
                ok: false,
                mensaje: "El campo 'nombre' no puede estar vacio"
            });
        }

        const nombreNormalizado = String(nombre).trim().toLowerCase();
        const duplicado = categorias.some(function (c) {
            return c.id !== id && c.nombre.toLowerCase() === nombreNormalizado;
        });

        if (duplicado) {
            return res.status(409).json({
                ok: false,
                mensaje: `Ya existe una categoria con el nombre '${nombre}'`
            });
        }

        categorias[indice].nombre = String(nombre).trim();
    }

    if (descripcion !== undefined) {
        categorias[indice].descripcion = String(descripcion).trim();
    }

    if (estado !== undefined) {
        if (estado !== "activo" && estado !== "inactivo") {
            return res.status(400).json({
                ok: false,
                mensaje: "El campo 'estado' solo acepta 'activo' o 'inactivo'"
            });
        }
        categorias[indice].estado = estado;
    }

    categorias[indice].updatedAt = new Date().toISOString();

    return res.status(200).json({
        ok: true,
        mensaje: "Categoria actualizada correctamente",
        datos: categorias[indice]
    });
};

// DELETE /api/categorias/:id
const eliminarCategoria = function (req, res) {
    const id = Number(req.params.id);
    const indice = categorias.findIndex(function (c) { return c.id === id; });

    if (indice === -1) {
        return res.status(404).json({
            ok: false,
            mensaje: `No existe la categoria con id ${req.params.id}`
        });
    }

    const categoriaEliminada = categorias.splice(indice, 1)[0];

    return res.status(200).json({
        ok: true,
        mensaje: "Categoria eliminada correctamente",
        datos: categoriaEliminada
    });
};

module.exports = {
    listarCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};
