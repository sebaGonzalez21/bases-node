function saludar(nombre) {
    let mensaje = `hola ${ nombre }`;

    return mensaje;
}

let saludo = saludar('seba');

console.log(saludo);