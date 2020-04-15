const argv = require('./config/yargs').argv;
const weatherFacade = require('./facade/weatherCountryFacade');

const finalResp = async() => {
    const weatherCountry = await weatherFacade.watherByCountry(argv.direccion).catch(err => err);
    console.log(weatherCountry);
}

finalResp();