const instance = require('../config/instanceAxios');

const getCountry = (direccion) => instance.getLugarLatLong(direccion).catch(err => err);

module.exports = {
    getCountry
}