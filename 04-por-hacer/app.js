const argv = require('./config/yargs').argv;
const color = require('colors');
const porHacer = require('./por-hacer/por-hacer');
let comando = argv._[0];

switch (comando) {
    case 'crear':
        let crear = porHacer.crear(argv.descripcion).then(data => console.log(data)).catch(err => console.log(err));
        break;

    case 'listar':
        let listado = porHacer.listado();
        if (listado.length > 0) {
            for (let tarea of listado) {
                console.log('**********POR HACER**********'.green);
                console.log(tarea.descripcion);
                console.log(tarea.completado);
                console.log('*****************************\n'.green);
            }
        } else {
            console.log('**********POR HACER**********'.green);
            console.log('No se encontraron tareas asignadas....');
            console.log('*****************************\n'.green);
        }
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('comando no reconocido');
}