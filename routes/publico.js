const express = require('express');

let Juego = require(__dirname + '/../models/juego.js');

let router = express.Router();

//GET /
router.get('/', (req,res) => {
    res.render('publico_index');
});

//GET /juegos/:id
router.get('/juegos/:id',(req,res) => {
    Juego.findById(req.params.id)
    .then(resultado => {
        if(resultado)
            res.render('publico_juego',{ juego: resultado})
        else    
            res.render('publico_error',{mensaje: "Juego no encontrado"});
    })
    .catch(error => {
        res.render('publico_error',{mensaje: error});
    })
})

//GET /buscar
router.post('/buscar', (req,res) => {
    Juego.find({"nombre" : {$regex: req.body.buscar, '$options' : 'i'}})
    .then(resultado => {
        if(resultado.length > 0)
            res.render('publico_index',{juegos: resultado});
        else 
            res.render('publico_error',{mensaje: "No se encontraron juegos"});
    })
    .catch(error => {
        res.render('publico_error',{mensaje: error});
    })
});

module.exports = router;