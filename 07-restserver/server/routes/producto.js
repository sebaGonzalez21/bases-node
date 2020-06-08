const express = require('express')
const app = express()
const { verificaToken } = require('../middlewares/autenticacion');
const _ = require('underscore');
let Producto = require('../models/producto');

// ========================
// Obtener todos los productos
// Populate cargar usuario y categoria
// paginado
// ========================

app.get('/productos', verificaToken, (req, res) => {
    try {

        let limit = Number(req.query.limit) || 10;
        let page = Number(req.query.page) || 0;

        Producto.find({})
            .skip(page)
            .limit(limit)
            .populate('usuario', 'email')
            .populate('categoria', 'descripcion')
            .exec((err, productoDb) => {
                if (err) {
                    return res.status(500).json({ ok: false, message: err });
                }
                Producto.countDocuments((err, quantityDb) => {
                    if (err) {
                        return res.status(500).json({ ok: false, message: err });
                    }

                    return res.json({ ok: true, productos: productoDb, quantity: quantityDb });
                });

            });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Error de sistema al listar productos' });
    }
});


// ========================
// Obtener un producto por id
// Populate cargar usuario y categoria
// ========================

app.get('/productos/:id', verificaToken, (req, res) => {
    try {
        let id = req.params.id;

        Producto.findById(id, {})
            .populate('usuario', 'email')
            .populate('categoria', 'descripcion')
            .exec((err, productoDb) => {
                if (err) {
                    return res.status(500).json({ ok: false, message: err });
                }

                return res.json({ ok: true, productos: productoDb });
            });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Error de sistema al obtener un producto' });
    }
});

// ========================
// Grabar un nuevo producto
// con la categoria del listado
// ========================

app.post('/productos', verificaToken, (req, res) => {
    try {
        let body = req.body;
        let usuario = req.usuario._id;
        let producto = new Producto({
            nombre: body.nombre,
            precioUni: body.precioUni,
            descripcion: body.descripcion,
            disponible: body.disponible,
            categoria: body.categoria,
            usuario
        });

        producto.save((err, productoDb) => {
            if (err) {
                return res.status(500).json({ ok: false, message: err });
            }
            return res.json({ ok: true, productos: productoDb });

        });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Error de sistema al guardar un producto' });
    }
});

// ========================
// Actualizar un producto
// con la categoria del listado
// ========================

app.put('/productos/:id', verificaToken, (req, res) => {
    try {
        let id = req.params.id;
        let body = _.pick(req.body, ['disponible', 'nombre', 'precioUni', 'descripcion', 'categoria', 'usuario']);
        Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDb) => {
            if (err) {
                return res.status(500).json({ ok: false, message: err });
            }

            if (!productoDb) {
                return res.status(500).json({ ok: false, message: 'Producto no identificado' });
            }

            return res.json({ ok: true, productos: productoDb });
        });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Error de sistema al actualizar un producto' });
    }
});

// ========================
// Borrar un producto // cambiar el estado disponible a falso
// ========================

app.delete('/productos/:id', verificaToken, (req, res) => {
    try {
        let id = req.params.id;
        Producto.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true }, (err, productoDb) => {
            if (err) {
                return res.status(500).json({ ok: false, message: err });
            }

            if (!productoDb) {
                return res.status(500).json({ ok: false, message: 'Producto no identificado' });
            }

            return res.json({ ok: true, productos: productoDb });
        });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Error de sistema al eliminar un producto' });
    }
});

module.exports = app;