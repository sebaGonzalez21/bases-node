let empleados = [{
        id: 1,
        nombre: 'Sebastian'
    },
    {
        id: 2,
        nombre: 'Melissa'
    }, {
        id: 3,
        nombre: 'Juan'
    }
];

let salarios = [{
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 2000
    }
];

let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {
        let empleadoDb = empleados.find(empleado => empleado.id === id)

        if (!empleadoDb) {
            reject(`No existe empleado con el id ${id}`);
        } else {
            resolve(empleadoDb);
        }
    });
};

let getSalario = (empleado) => {

    return new Promise((resolve, reject) => {
        let salarioDb = salarios.find(salario => salario.id === empleado.id);
        if (!salarioDb) {
            reject(`No existe salario para el empleado ${empleado.nombre}`);
        } else {
            resolve({
                id: empleado.id,
                nombre: empleado.nombre,
                salario: salarioDb.salario
            });
        }
    })
};


/*
getEmpleado(1).then(empleado => {
    getSalario(empleado).then(salarioEmpleado => {
        console.log('Salario de empleado', salarioEmpleado);
    }, err => console.log(err));
}, (err => console.log(err)));*/


/*
    Encadenar promesas
*/

getEmpleado(4).then(empleado => {
    return getSalario(empleado);
}).then(resp => console.log(`El empleado es: ${resp.nombre} y su salario es: ${resp.salario}`)).catch(err => console.log(err));