var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var authentication = require('./routes/authentication');
var db = require('./routes/db');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(
    {
        secret:'A SECRET KEY. SHOULD BE UNIQE TO THE APP. DONT EVER SHOW IT TO ANYONE',
        resave : true,
        saveUninitialized : true,
        cookie:{
            httpOnly: true,
            maxAge: 600000,
        }
    }
));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authentication);
app.use('/', index);

// connect()
//     .on('error', console.log)
//     .on('disconnected', connect);
//
// function connect() {
//     var options = {server : {socketOptions : {keepAlive : 1} } };
//     return mongoose.connect('mongodb://localhost:27017/mongoose_games', options).connection;
// }


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
