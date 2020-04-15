const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {
    default: false,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs')
    .command('listar', 'imprime un elemento', {
        descripcion
    })
    .command('crear', 'crea un elemento', {
        descripcion
    })
    .command('actualizar', 'actualiza un elemento', {
        descripcion,
        completado
    })
    .command('borrar', 'borra un elemento', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}