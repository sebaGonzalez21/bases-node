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

let getSalario = (empleado, callback) => {
    if (!empleado) {
        callback(`Ingrese un empleado valido!`);
    } else {
        let salario = salarios.find(salarios => salarios.id === empleado.id);
        if (salario) {
            callback(null, { nombre: empleado.nombre, salario: salario.salario });
        } else {
            callback(`No se encontro salario para el usuario ${empleado.nombre}`);
        }
    }
};

let getEmpleado = (id, callback) => {
    let empleadoDb = empleados.find(empleado => empleado.id === id)

    if (!empleadoDb) {
        callback(`No existe empleado con el id ${id}`);
    } else {
        callback(null, empleadoDb);
    }
};

getEmpleado(3, (err, empleado) => {
    if (err) {
        return console.log(err);
    }

    getSalario(empleado, (err, resp) => {
        if (err) {
            return console.log(err);
        }
        console.log(`El Salario de ${resp.nombre} es de $${resp.salario}`);
    })
});