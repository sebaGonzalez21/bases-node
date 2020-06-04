const express = require('express')
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

});
//configuraciones de google
const verify = async(token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        return {
            nombre: payload.name,
            email: payload.email,
            img: payload.picture ? payload.picture : "",
            google: true
        }
    } catch (err) {
        console.log(err);
    }
};

app.post('/google', async(req, res) => {
    let token = req.get('Authorization');
    let googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({ ok: false, err });
        });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDb) => {
        if (err) {
            return res.status(500).json({ ok: false, err });
        }

        if (usuarioDb) {
            if (!usuarioDb.google) {
                return res.status(400).json({ ok: false, message: "Debe de usar su autenticacion normal" });
            } else {
                let token = jwt.sign({
                    usuario: usuarioDb
                }, process.env.SEED, {
                    expiresIn: process.env.CADUCIDAD_TOKEN
                });
                return res.json({
                    ok: true,
                    usuario: usuarioDb,
                    token
                })
            }
        } else {
            //si el usuario no existe en la bd
            let usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = bcrypt.hashSync(":)", 10);

            usuario.save((err, usuarioDb) => {
                if (err) {
                    return res.status(500).json({ ok: false, err });
                }

                if (usuarioDb) {
                    if (!usuarioDb.google) {
                        return res.status(400).json({ ok: false, message: "Debe de usar su autenticacion normal" });
                    } else {
                        let token = jwt.sign({
                            usuario: usuarioDb
                        }, process.env.SEED, {
                            expiresIn: process.env.CADUCIDAD_TOKEN
                        });
                        return res.json({
                            ok: true,
                            usuario: usuarioDb,
                            token
                        })
                    }
                }

            });
        }
    })
});

module.exports = app