const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('./config/config');
const PORT = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuarios', function(req, res) {
    res.json({ up: "get usuario" })
})


app.post('/usuarios', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({ ok: false, mensaje: 'nombre es necesario' });
    } else {
        res.json({
            persona: body
        })
    }


})

app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id;

    res.json({ id })
})

app.delete('/usuarios', function(req, res) {
    res.json({ up: "delete usuario" })
})

app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
})