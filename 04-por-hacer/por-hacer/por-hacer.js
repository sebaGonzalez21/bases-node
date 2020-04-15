const fs = require('fs');
let listadoPorHacer = [];

const guardarDb = () => {
    let data = JSON.stringify(listadoPorHacer);
    return writeFile(data);
}

const cargarDb = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }
    return listadoPorHacer;
}

const writeFile = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('db/data.json', data, err => {
            if (err) reject(err);
            resolve('Guardo con exito!');
        });
    });
}

const crear = async(descripcion) => {
    cargarDb();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDb().then(data => data).catch(err => err);
    return porHacer;
}

const listado = () => {
    cargarDb();
    return listadoPorHacer;
}

const borrar = (descripcion) => {
    let borro = false;
    cargarDb();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        borro = true;
        guardarDb();
    }
    return borro;
}

const actualizar = (descripcion, completado = true) => {
    let actualizo = false;
    try {
        cargarDb();
        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
        if (index >= 0) {
            listadoPorHacer[index].completado = true;
            actualizo = true;
            guardarDb();
        }
    } catch (err) {
        throw new Error(err);
    }
    return actualizo;
}

module.exports = {
    crear,
    listado,
    actualizar,
    borrar
}