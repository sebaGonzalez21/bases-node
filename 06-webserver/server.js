const express = require('express');
const app = express();
const hbs = require('hbs');
require('./hbs/hbs');
app.use(express.static(__dirname + '/public'));

//EXPRESS HBS
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'Sebastian GonzAleZ'
    });
})

app.get('/about', (req, res) => {

    res.render('about', {});
})

app.listen(PORT, () => {
    console.log(`Escuchando peticiones en el puerto ${PORT}`);
});