
// Middleware que se aplicará para autenticar usuarios en rutas protegidas
module.exports = autenticacion = (req, res, next) => {
    if (req.session && req.session.usuario)
        return next();
    else
        res.render('auth_login');
};