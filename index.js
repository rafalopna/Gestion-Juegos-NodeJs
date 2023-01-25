const nunjucks = require("nunjucks");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const genUsuarios = require("./utils/generar_usuarios");
const genJuegos = require("./utils/generar_juegos");
const methodOverride = require("method-override");
const session = require('express-session');

//Enrutadores
const publico = require(__dirname + '/routes/publico');
const juegos = require(__dirname + '/routes/juegos');
const auth = require(__dirname + '/routes/auth');

//Conexión a bbdd
mongoose.connect('mongodb://mongodb:27017/playrest_v3', {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));


let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine','njk');

app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req,res) {
    if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));
app.use('/admin',juegos);
app.use('/auth',auth);
app.use('/',publico);


app.listen(8080);

//Datos de inicio
genUsuarios.generarUsuarios();
genJuegos.generarJuegos();