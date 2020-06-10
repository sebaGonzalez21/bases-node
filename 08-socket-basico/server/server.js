const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

//se envia el http al server de express
let server = http.createServer(app);

//middleware para habilitar carpeta publica
app.use(express.static(publicPath));

//Mantiene conexion directa con el servidor
module.exports.io = socketIO(server);
require('./sockets/socket');
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});