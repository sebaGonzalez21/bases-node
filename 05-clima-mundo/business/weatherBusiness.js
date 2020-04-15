const instance = require('../config/instanceAxios');

const getWeather = (lat, lng) => instance.getClima(lat, lng).catch(err => err);

module.exports = {
    getWeather
}