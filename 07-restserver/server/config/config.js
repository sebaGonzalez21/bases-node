const mongoose = require('mongoose');
// ========================
// PUERTO
// ========================
process.env.PORT = process.env.PORT || 3000;

// ========================
// ENTORNO
// ========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
// Base de Datos
// ========================
let urlDatabase;

if (process.env.NODE_ENV === 'dev') {
    urlDatabase = 'mongodb://cafe:cafe@localhost/cafe';
} else {
    urlDatabase = process.env.MONGO_URI;
}
process.env.URLDB = urlDatabase;

// ========================
// CONEXION MONGO
// ========================

const conectionDb = async() => {
    //'mongodb://cafe:cafe@localhost/cafe'
    return await mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
}

conectionDb().then(data => console.log('conectado a db mongo..')).catch(err => console.log('error conexion db..', err))