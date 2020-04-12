const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar')
const argv = require('./config/yargs').argv;
const colors = require('colors');


let comando = argv._[0];

switch (comando.toLocaleLowerCase().trim()) {
    case 'listar':
        listarTabla(argv.base, argv.limite)
            .then(message => console.log(message))
            .catch(err => console.log(err));
        break;
    case 'crear':
        crearArchivo(argv.base, argv.limite)
            .then(message => console.log(message))
            .catch(err => console.log(err));
        break;
    default:
        console.log('Comando no reconocido');
}

console.log('Limite', argv.base);

//let argv2 = process.argv;
//console.log(argv2);