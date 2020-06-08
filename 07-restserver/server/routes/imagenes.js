const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { verificaTokenImagen } = require('../middlewares/autenticacion');

app.get('/imagen/:tipo/:img', verificaTokenImagen, (req, res) => {
    try {
        let tipo = req.params.tipo;
        let img = req.params.img;

        let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
        let noImagePath = path.resolve(__dirname, '../assets/original.jpg')
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        };
        return res.sendFile(noImagePath);
    } catch (err) {
        return res.status(500).json({ ok: false, err });
    }

})

module.exports = app;