const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;
//campos que tendra la coleccion
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "el nombre es necesario"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "el correo es necesario.."]
    },
    password: {
        type: String,
        required: [true, "La contrasena es obligatoria"]
    },
    img: {
        type: String,
        required: false
    }, //no es obligatorio
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }, //default user role
    estado: {
        type: Boolean,
        default: true
    }, //boolean,
    google: {
        type: Boolean,
        default: false
    } //boolean
});
//Eliminar data sensible luego de retornar
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);