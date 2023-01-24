const express = require('express');
const bcrypt = require('bcrypt');
let Usuario = require(__dirname + '/../models/usuario.js');

let router = express.Router();

//GET /auth/login
router.get('/login', (req, res) => {
    res.render('auth_login');
});

//POST /auth/login
router.post('/login',(req,res) => {
    let login = req.body.login;

    Usuario.find({ login: login })
        .then(usuario => {
            if(usuario.length > 0) {
                bcrypt.compare(req.body.password,usuario[0].password, function(err,result) {
                    if(result){
                        req.session.usuario = usuario[0].login;
                        res.redirect('/admin');
                    } else {
                        res.render('auth_login',{error: 'Contraseña incorrecta'});
                    }
                });
            } else {
                res.render('auth_login', {error: 'Usuario no encontrado'});
            }
        })
        .catch(error => {
            res.render('auth_login', {error: error});
        });
});

//GET /auth/logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;