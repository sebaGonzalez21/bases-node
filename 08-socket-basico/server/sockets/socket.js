const { io } = require('../server');

//Trabajar cuando el usuario ya se conecto
io.on('connection', (client) => {
    console.log("Usuario Conectado");
    client.on('disconnect', () => {
        console.log("Usuario Desconectado");
    });

    //escuchar cliente
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);

        // if (message.usuario) {
        //     callback({
        //         resp: "Todo salio bien"
        //     });
        // } else {
        //     callback({
        //         resp: "Todo salio mal!!!!!"
        //     });
        // }

        client.broadcast.emit('enviarMensaje', data);


    });

    client.emit('enviarMensaje', {
        usuario: "Admin",
        message: "bienvenido a la aplicacion"
    });

});