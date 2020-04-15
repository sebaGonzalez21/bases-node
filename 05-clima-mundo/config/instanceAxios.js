const axios = require('axios').default;

const getLugarLatLong = async(dir) => {
    const encodedUrl = encodeURI(dir);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedUrl}`,
        timeout: 2000,
        headers: { 'X-RapidAPI-Key': '97f348b00dmshe7dcdf4f87f8640p1be097jsn1d2aa7874bcb' }
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`no hay resultados para ${dir}`)
    }

    const data = resp.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        direccion,
        lat,
        lng
    };

};

const getClima = async(lat, lng) => {
    return await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=edcef2cbdd20179bd65a7e334aec06d5&units=metric`).catch(err => err);
}



module.exports = {
    getLugarLatLong,
    getClima
}