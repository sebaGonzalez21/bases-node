const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//campos de la coleccion
let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, "la descripcion es requerida"],
    },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});



module.exports = mongoose.model('Categoria', categoriaSchema);