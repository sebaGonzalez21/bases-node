const express = require('express')
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    try {

        let body = req.body;
        Usuario.findOne({ email: body.email }, (err, usuarioDb) => {
            if (err) {
                return res.status(500).json({ ok: false, err });
            }

            if (!usuarioDb) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrecto'
                    }
                });
            }

            if (!bcrypt.compareSync(body.password, usuarioDb.password)) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'Usuario o contraseña incorrecto'
                    }
                });
            }

            let token = jwt.sign({
                usuario: usuarioDb
            }, process.env.SEED, {
                expiresIn: process.env.CADUCIDAD_TOKEN
            });

            res.json({
                ok: true,
                usuario: usuarioDb,
                token
            })

        });
    } catch (err) {
        console.log('Error server', err)
        res.status(500).json({ ok: false, mensaje: 'error desconocido ingrese valores' });
    }

})

module.exports = app