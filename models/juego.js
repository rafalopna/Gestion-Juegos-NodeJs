const mongoose = require('mongoose');

let currentYear = new Date().getFullYear();

let edicionSchema = mongoose.Schema({
    edicion: {
        type: String,
        required: true
    },
    anyo: {
        type: Number,
        min: 2000,
        max: Number(currentYear)
    }
});

let juegoSchema = mongoose.Schema({
    nombre: {
        type: String,
        minlenght: 6,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        min: 1,
        max: 100
    },
    jugadores: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        enum: ['rol','escape','dados','fichas','cartas','tablero']
    },
    precio: {
        type: Number,
        require: true,
        min: 1
    },
    imagen: {
        type: String
    },
    ediciones: [edicionSchema]
});

let Juego = mongoose.model('juego',juegoSchema);

module.exports = Juego;