const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');
//conexion de los servicos de databases
require('./server/config/config');
const PORT = process.env.PORT;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//configuracion global de rutas
app.use(require('./server/routes/index'));

//habilitar carpeta public
app.use(express.static(path.resolve(__dirname, './public')));

app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
})