const express = require('express')
const app = express();
const bcrypt = require('bcrypt')
const _ = require('underscore')

const Usuario = require('../models/usuario');


app.get('/usuarios', function(req, res) {

    try {
        let desde = req.query.desde || 0;
        desde = Number(desde);

        let limite = req.query.limite || 5;
        limite = Number(limite);

        let filtros = {
            estado: true
        }

        Usuario.find(filtros, 'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if (err) {
                    return res.status(400).json({ ok: false, err });
                }

                Usuario.countDocuments(filtros, (err, quantity) => {
                    if (err) {
                        return res.status(400).json({ ok: false, err });
                    }
                    res.json({
                        ok: true,
                        cantidad: quantity,
                        usuarios
                    })
                });


            })
    } catch (err) {
        console.log('Error server', err)
        res.status(500).json({ ok: false, mensaje: 'error desconocido ingrese valores' });
    }

})


app.post('/usuarios', function(req, res) {
    try {

        let body = req.body;

        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        });


        usuario.save((err, usuarioDb) => {
            if (err) {
                return res.status(400).json({ ok: false, err });
            }
            //no se puede una vez que se rescata
            //delete usuarioDb.password;
            res.json({
                ok: true,
                usuario: usuarioDb
            })
        });
    } catch (err) {
        console.log('Error server', err)
        res.status(500).json({ ok: false, mensaje: 'error desconocido ingrese valores' });
    }

})

app.put('/usuarios/:id', function(req, res) {
    try {

        let id = req.params.id;
        let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);



        Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDb) => {
            if (err) {
                return res.status(400).json({ ok: false, err });
            }

            res.json({
                ok: true,
                usuario: usuarioDb
            })

        });

    } catch (err) {
        console.log('Error server', err)
        res.status(500).json({ ok: false, mensaje: 'error al actualizar ingrese valores' });
    }
})

app.delete('/usuarios/:id', function(req, res) {
    try {

        let id = req.params.id;

        //Usuario.findByIdAndRemove(id, (err, usuarioDb) => {
        Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioDb) => {
            if (err) {
                return res.status(400).json({ ok: false, err: 'Error al eliminar usuario' });
            }

            if (!usuarioDb) {
                return res.status(400).json({ ok: false, err: 'usuario no encontrado' });
            }

            res.json({
                ok: true,
                usuarioDb
            })
        })



    } catch (err) {
        console.log('Error server', err)
        res.status(500).json({ ok: false, mensaje: 'error de sistema' });
    }
})

module.exports = app