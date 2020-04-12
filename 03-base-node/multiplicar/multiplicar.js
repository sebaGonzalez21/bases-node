const fs = require('fs');
const colors = require('colors/safe');

let listarTabla = (base, limite) => {
    return new Promise((resolve, reject) => {
        let dataFile = "";
        if (!Number(base) && !Number(limite)) {
            reject(`El valor introducido no es un numero!`);
        } else {
            for (let i = 1; i <= limite; i++) {

                dataFile += `${base} * ${i} = ${(base*i)} \n`.green;

            }
            resolve(`Listando Tabla:\n${dataFile.green}`);
        }
    })
}

let crearArchivo = (base, limite) => {

    return new Promise((resolve, reject) => {
        let dataFile = "";

        if (!Number(base) && !Number(limite)) {
            reject(colors.red(`El valor introducido no es un numero!`));
        } else {
            const tablaFile = `tabla-${base}-al-${limite}.txt`;
            for (let i = 1; i <= limite; i++) {
                dataFile += `${base}*${i}=${(base*i)} \n`;
            }

            const data = new Uint8Array(Buffer.from(dataFile));
            fs.writeFile(`tablas/${tablaFile}`, data, (err) => {
                if (err) {
                    reject(`Archivo No Creado: ` + colors.red(`${tablaFile}`));
                }
                resolve(`Archivo Creado: ${tablaFile.green}`);
            });

        }
    })
}

module.exports = {
    crearArchivo,
    listarTabla
}