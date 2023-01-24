const mongoose = require('mongoose');

let usuarioSchema = mongoose.Schema({
    login: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
    }
});

let Usuario = mongoose.model('usuario', usuarioSchema);
module.exports = Usuario;