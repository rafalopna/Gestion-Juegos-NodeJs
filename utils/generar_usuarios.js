const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');
const bcrypt = require('bcrypt');

mongoose.set('strictQuery', true);

function generarUsuarios() {

    try {
        Usuario.collection.drop();   
    } catch (error) {}

    let usu1 = new Usuario({
        login: 'maycalle',
        password: '12345678'
    });
    bcrypt.genSalt(10, function(err,salt) {
        bcrypt.hash(usu1.password, salt, function(err,hash) {
            if(hash) {
                usu1.password = hash;
                usu1.save();
            }
        });
    });

    let usu2 = new Usuario({
        login: 'rafa1234',
        password: 'rafa1234'
    });
    bcrypt.genSalt(10, function(err,salt) {
        bcrypt.hash(usu2.password, salt, function(err,hash) {
            if(hash) {
                usu2.password = hash;
                usu2.save();
            }
        });
    });
}


module.exports = {
    "generarUsuarios": generarUsuarios
}