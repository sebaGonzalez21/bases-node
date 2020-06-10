var socket = io();
//escuchar procesos
socket.on('connect', function() {
    console.log("conectado al servidor");
});

//escuchar procesos
socket.on('disconnect', function() {
    console.log("Perdimos conexion con el servidor");
});
//Enviar mensaje
socket.emit('enviarMensaje', {
    usuario: 'Sebastian Gonzalez',
    message: 'Hola mundo'
}, function(resp) {
    console.log("resp server: ", resp);
});

//Escuchar informacion
socket.on('enviarMensaje', function(message) {
    console.log('Servidor-->', message);
});