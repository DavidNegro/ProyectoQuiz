var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride= require('method-override');
var session = require('express-session');


var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){
    //control de la sesión:
   var now = new Date().getTime();
   if(req.session.lastConnection && 
       (now - req.session.lastConnection)>120000){ //120000~ 2 minutos en ms
       //si la última conexión de un usuario supera 2 minutos consideramos que:
       //---Si estaba conectado con una cuenta, ya no tiene
       // validez y deberá iniciar sesión de nuevo
       //---La última página visitada tampoco tendrá validez: para evitar casos en
       //los que un usuario acceda directamente a la página de login y sea redireccionado
       //a la última página de su anterior sesión
          delete req.session.user; 
          delete req.session.redir;
    }
    req.session.lastConnection=now;
    
    
    if(!req.session.redir){
        req.session.redir='/';
    }
    
    //guardar path en session.redir para después de login
    if(!req.path.match(/\/login|\/logout|\/user/)){
        req.session.redir=req.path;
    }
    
    //Hacer visible req.session en las visitas
    res.locals.session = req.session;
    next();
});


app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
