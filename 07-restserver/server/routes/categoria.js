const express = require('express');
const app = express();
let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
let Categoria = require('../models/categoria');
const _ = require('underscore');
// =============================
// Mostrar todas las categorias
// =============================
app.get('/categorias', verificaToken, (req, res) => {
    try {
        Categoria.find({})
            .sort('descripcion')
            .populate('usuario', 'nombre email') //revisa los obj id que existen, y permiten cargar informacion
            .exec((err, categoriaDb) => {
                if (err) {
                    return res.status(500).json({ ok: false, message: err });
                }

                Categoria.countDocuments((err, categoriaQuantity) => {
                    if (err) {
                        return res.status(400).json({ ok: false, message: err });
                    }

                    return res.json({ ok: true, categorias: categoriaDb, cantidad: categoriaQuantity });
                })
            })
    } catch (err) {

        return res.status(500).json({ ok: false, message: 'error desconocido al listar categorias' });
    }
});

// =============================
// Mostrar una categoria por id
// =============================
app.get('/categorias/:id', verificaToken, (req, res) => {
    try {
        let id = req.params.id;
        Categoria.findById(id, (err, categoriaDb) => {
            if (err) {
                return res.status(500).json({ ok: false, message: err });
            }

            if (!categoriaDb) {
                return res.status(400).json({ ok: false, message: 'Categoria no identificada' });
            }

            return res.json({ ok: true, categorias: categoriaDb });
        })
    } catch (err) {

        return res.status(500).json({ ok: false, message: 'error desconocido al listar categoria por id' });
    }
});

// =============================
// Crear una nueva categoria
// =============================
app.post('/categorias', verificaToken, (req, res) => {
    try {
        let body = req.body;
        let categoria = new Categoria({
            descripcion: body.descripcion,
            usuario: req.usuario._id
        });

        categoria.save((err, categoriaDb) => {
            if (err) {
                return res.status(500).json({ ok: false, message: err });
            }

            return res.json({ ok: true, categorias: categoriaDb });
        })
    } catch (err) {

        return res.status(500).json({ ok: false, message: 'error desconocido al guardar categorias' });
    }
});

// =============================
// Actualizar una categoria
// =============================
app.put('/categorias/:id', verificaToken, (req, res) => {
    try {
        let body = _.pick(req.body, ['descripcion']);
        Categoria.findOneAndUpdate(req.params.id, body, { new: true, runValidators: true }, (err, categoriaDb) => {
            if (err) {
                return res.status(500).json({ ok: false, message: err });
            }

            if (!categoriaDb) {
                return res.status(400).json({ ok: false, message: 'Categoria no identificada' });
            }

            return res.json({ ok: true, categorias: categoriaDb });
        })
    } catch (err) {

        return res.status(500).json({ ok: false, message: 'error desconocido al actualizar categorias' });
    }
});

// =============================
// Eliminar una categoria
// =============================
app.delete('/categorias/:id', [verificaToken, verificaAdminRole], (req, res) => {
    try {
        let id = req.params.id;
        Categoria.findByIdAndDelete(id, (err, categoriaDb) => {
            if (err) {
                return res.status(500).json({ ok: false, message: err });
            }

            if (!categoriaDb) {
                return res.status(400).json({ ok: false, message: 'Categoria no identificada' });
            }
            return res.json({ ok: true, message: `categoria ${id} eliminada` });
        });
    } catch (err) {

        return res.status(500).json({ ok: false, message: 'error desconocido al eliminar categorias' });
    }
});
module.exports = app;