const mongoose = require('mongoose');
const Juego = require(__dirname + '/../models/juego');

mongoose.set('strictQuery', true);

function generarJuegos() {
    
    try {
        Juego.collection.drop(); 
    } catch (error) {}

    let juego1 = new Juego({
        nombre: "Parchís",
        descripcion: "Juego para todos los públicos",
        edad: 4,
        jugadores: "4",
        tipo: "fichas",
        precio: 24,
        imagen: "pachis.jpg",
        ediciones: [
            {
                edicion: 'Parchís Juego de Tronos',
                anyo: 2019
            },
            {
                edicion: 'Parchis Harry Potter',
                anyo: 2015
            }
        ]
    });
    juego1.save();

    let juego2 = new Juego({
        nombre: "Monopoly",
        descripcion: "Juego de Mesa clásico para la Familia de 2 a 6 Jugadores",
        edad: 8,
        jugadores: "5",
        tipo: "tablero",
        precio: 30,
        imagen: "monopoly.jpg",
        ediciones: [
            {
                edicion: 'Monopoly Fornite',
                anyo: 2021
            },
            {
                edicion: 'Monopoly Jurassic Parck',
                anyo: 2012
            }
        ]
    });
    juego2.save();

    let juego3 = new Juego({
        nombre: "Ajedrez",
        descripcion: "El ajedrez es un juego de tablero entre dos contrincantes en el que cada uno dispone al inicio de 16 piezas móviles que se colocan sobre un tablero​ dividido en 64 casillas.",
        edad: 9,
        jugadores: "2",
        tipo: "tablero",
        precio: 15,
        imagen: "ajedrez.jpg"
    });
    juego3.save();


    
}


module.exports = {
    "generarJuegos": generarJuegos
}