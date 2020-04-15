const country = require('../business/countryBusiness');
const weather = require('../business/weatherBusiness');


const watherByCountry = async(direccion) => {
    let countryData = await country.getCountry(direccion).then(resp => resp).catch(err => {
        throw new Error(`Error al buscar el pais ${direccion}`, err)
    });

    let weatherData = await weather.getWeather(countryData.lat, countryData.lng).then(resp => resp.data.main.temp).catch(err => {
        throw new Error(`Error al buscar clima en pais ${countryData.direccion}`, err)
    });

    return {
        pais: countryData.direccion,
        temperatura: weatherData
    };
}

module.exports = {
    watherByCountry
};