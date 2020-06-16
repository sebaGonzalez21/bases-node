const { io } = require('../server');
const { Usuarios } = require('../classes/usuario');
const { crearMensaje } = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        client.join(data.sala);
        let personas = usuarios.getPersona(client.id);
        if (!personas) {
            personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);
            usuarios.getPersonas(client.id, data.nombre);
        }
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonas());
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió`))

        callback(personas);
    })

    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });

    client.on('disconnect', () => {
        console.log("se va a desconectar...");
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`))
        client.broadcast.emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    //mensajes privados
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.id).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    })

});