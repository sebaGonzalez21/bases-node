/**
 * Async
 */

//let getNombre = async() => {
//throw new Error('No existe nombre para el usuario');
//    return `Sebastian`
//}
//console.log(getNombre());


let getNombre = async() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Sebita');
        }, 3000);
    });
}

let saludo = async() => {
    let nombre = await getNombre();
    return `Hola ${nombre}`;
}

saludo().then(mensaje => {
    console.log(mensaje);
}).catch(err => {
    console.log(err)
})