const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const fs = require('fs');
const Usuario = require('../models/usuario');

// default options
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', function(req, res) {
    try {

        let tipo = req.params.tipo;
        let id = req.params.id;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ ok: false, err: 'No files were uploaded.' });
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let archivo = req.files.archivo; //nombre del archivo a obtener


        let tiposValidos = ['productos', 'usuarios'];
        if (tiposValidos.indexOf(tipo) < 0) {
            return res.status(400).json({ ok: false, message: 'Las tipos permitidos son: ' + tiposValidos.join(','), tipo });
        }
        //extensiones permitidas
        let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
        let nombreCortado = archivo.name.split('.');
        let extension = nombreCortado[nombreCortado.length - 1]

        if (extensionesValidas.indexOf(extension) < 0) {
            return res.status(400).json({ ok: false, message: 'Las extensiones permitidas son: ' + extensionesValidas.join(','), extension });
        }

        //cambiar nombre al archivo
        let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(path.normalize(`uploads/${tipo}/${nombreArchivo}`), (err) => {
            if (err) {
                return res.status(500).json({ ok: false, err: err });
            };

            return imagenUsuario(id, res, nombreArchivo);

        });
    } catch (err) {
        return res.status(500).json({ ok: false, err: err });
    }
});

const imagenUsuario = (id, res, nombreArchivo) => {
    Usuario.findById(id, (err, usuarioDb) => {
        if (err) {
            return res.status(500).json({ ok: false, err: err });
        }

        if (!usuarioDb) {
            return res.status(400).json({ ok: false, err: 'Usuario no existe' });
        };


        usuarioDb.img = nombreArchivo;
        usuarioDb.save((err, usuarioSave) => {
            if (err) {
                return res.status(500).json({ ok: false, err: err });
            }
            return res.json({ ok: true, usuario: usuarioSave, img: nombreArchivo });
        });
    });
};

const imagenProducto = () => {

};

module.exports = app;