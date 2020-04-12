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

let getEmpleado = async(id) => {

    let empleadoDb = empleados.find(empleado => empleado.id === id)

    if (!empleadoDb) {
        throw new Error(`No existe empleado con el id ${id}`);
    } else {
        return empleadoDb;
    }
};

let getSalario = async(empleado) => {
    let salarioEmpleadoDb = salarios.find(salario => salario.id === empleado.id);
    if (!salarioEmpleadoDb) {
        throw new Error(`Empleado con el id ${empleado.id} no tiene salario`);
    } else {
        return {
            nombre: empleado.nombre,
            salario: salarioEmpleadoDb.salario,
            id: empleado.id
        };
    }
};


let getInformacion = async(id) => {
    let empleado = await getEmpleado(id);
    let resp = await getSalario(empleado);
    return `${resp.nombre} tiene un salario de $${resp.salario}`;
}

getInformacion(1).then(mensaje => console.log(mensaje)).catch(err => console.log(err));