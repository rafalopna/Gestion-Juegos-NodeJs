const express = require('express');
const multer = require('multer');
const autenticacion = require(__dirname + '/../utils/auth.js');
let Juego = require(__dirname + '/../models/juego.js');

let storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req,file,cb) {
        cb(null,Date.now() + "_" + file.originalname)
    }
})

let upload = multer({storage:storage});

let router = express.Router();

//GET /admin/juegos
router.get('/', autenticacion,(req,res) => {
    Juego.find()
    .then(resultado => {
        res.render('admin_juegos', {juegos: resultado});
    })
    .catch(error => {
        res.render('admin_error', {mensaje:error});
    })
});

//GET /admin/juegos/nuevo
router.get('/juegos/nuevo',autenticacion,(req,res) => {
    res.render('admin_juegos_form')
});

//GET /admin/juegos/editar/:id
router.get('/juegos/editar/:id',autenticacion,(req,res) => {
    Juego.findById(req.params.id)
    .then(resultado => {
        if(resultado)
            res.render('admin_juegos_form',{ juego: resultado})
        else    
            res.render('admin_error',{ mensaje: "Juego no encontrado"})
    })
    .catch(error => {
        res.render('admin_error',{ mensaje: error})
    })
});

//POST /admin/juegos
router.post('/juegos',autenticacion,upload.single('imagen'),(req,res) => {
    let juegoNuevo;

    try {
        juegoNuevo = new Juego({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            jugadores: req.body.jugadores,
            tipo: req.body.tipo,
            precio: req.body.precio,
            imagen: req.file.filename
        });

        juegoNuevo.save().then(() => {
            res.redirect('/admin');
        }).catch(error => {
            res.render('admin_error',{mensaje:error});
        });
    } catch(error) {
        res.render('admin_error',{mensaje:error});
    }
});

//PUT|POST /admin/juegos/:id
router.post('/juegos/:id',autenticacion,upload.single('imagen'), (req,res) => {
    let juego = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        edad: req.body.edad,
        jugadores: req.body.jugadores,
        tipo: req.body.tipo,
        precio: req.body.precio
    };

    try {
        if(req.file.filename) {
            juego.imagen = req.file.filename;
        }
    } catch(e){}

    Juego.findByIdAndUpdate(req.params.id, {
        $set: juego }, { new: true })
         .then(resultado => {
            if(resultado)
                res.redirect('/admin');
            else
                res.render('admin_error',{mensaje:error});
        }).catch(error => {
            res.render('admin_error',{mensaje:error});
        });
});

//DELETE /admin/juegos/:id
router.delete('/juegos/:id',autenticacion,(req,res) => {
    Juego.findByIdAndRemove(req.params.id)
        .then(resultado => {
            if(resultado)
                res.redirect('/admin');
            else
                res.render('admin_error',{error:"Juego no encontrado"});
        })
        .catch(error => {
            res.render('admin_error',{mensaje:error});
        })
});

//GET /admin/juegos/edicion/nueva
router.get('/juegos/edicion/nueva/:idJuego',autenticacion,(req,res) => {
    res.render('admin_ediciones_form', {idJuego: req.params.idJuego});
});

//GET /admin/juegos/edicion/:idJuego/:idEdicion
router.get('/juegos/edicion/:idJuego/:idEdicion',autenticacion,(req,res) => {
    let edicion;

    Juego.findById(req.params.idJuego)
        .then(j => {
            j.ediciones.forEach(ed => {
                if(ed.id === req.params.idEdicion) {
                    edicion = ed;
                }
            });

            if(edicion !== undefined) {
                res.render('admin_ediciones_form',{ idJuego: j.id, edicion: edicion})
            } else {
                es.render('admin_error',{mensaje: "Edicion no encontrada"});
            }
        })
        .catch(error => {
            res.render('admin_error',{ mensaje: error})
        });
});

//POST /admin/juegos/edicion/:idJuego
router.post('/juegos/edicion/:idJuego',autenticacion,(req,res) => {
    Juego.findByIdAndUpdate(req.params.idJuego,{
        $push: { 
            ediciones:{
                edicion: req.body.edicion,
                anyo: req.body.anyo
            }}}, { new: true, runValidators: true })
        .then(() => {
            res.redirect('/admin');
        })
        .catch(error => {
            res.render('admin_error',{mensaje: error});
    });
});

//PUT /admin/juegos/edicion/:idJuego/:idEdicion
router.put('/juegos/edicion/:idJuego/:idEdicion',autenticacion, (req,res) => {
    Juego.updateOne(
        {
        _id: req.params.idJuego,
        "ediciones._id" : req.params.idEdicion
        },
        {
            $set: {
                'ediciones.$.edicion': req.body.edicion,
                'ediciones.$.anyo': req.body.anyo
            }
        }).then(() => {
            res.redirect('/admin/juegos/editar/' + req.params.idJuego);
        }).catch(error => {
            res.render('admin_error',{ mensaje: error})
        });
});

//DELETE /admin/juegos/edicion/:idJuego/:idEdicion
router.delete('/juegos/edicion/:idJuego/:idEdicion',autenticacion,(req,res) => {
    Juego.findByIdAndUpdate(req.params.idJuego,
        {$pull: { ediciones:{
            _id: req.params.idEdicion
        }}}, { new: true })
    .then(() => {
        res.redirect('/admin/juegos/editar/' + req.params.idJuego);
    })
    .catch(error => {
        res.render('admin_error',{ mensaje: error})
    });
});

module.exports = router;