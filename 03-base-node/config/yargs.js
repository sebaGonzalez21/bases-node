const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    }
};

const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla multiplicar', opts)
    .command('crear', 'genera archivo con tabla multiplicar', opts)
    .help()
    .argv;

module.exports = {
    argv
}