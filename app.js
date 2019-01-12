var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formBody = require("body/form");
var multer          = require('multer');
var mongoose       = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
require('./MongoControl/model');
var app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.use(bodyParser({limit : "500000kb"}));
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/Favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({"limit":"9000000kb"}));
app.use(bodyParser.urlencoded({ extended: false,"limit":"9000000kb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/images",  express.static(__dirname + '/public/images'));
app.use("/video",  express.static(__dirname + '/public/video'));
app.use("/videos",  express.static(__dirname + '/public/videos'));
app.use("/com",  express.static(__dirname + '/public/com'));
app.use("/months",  express.static(__dirname + '/public/monthresolutions'));
app.use('/public', express.static(path.join(__dirname, 'public')));

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log('错误处理模块');
    if (err.name === 'UnauthorizedError') {
        console.log('Invalid token');
        res.status(401).send('invalid token...');
    }
    if(err == "JsonWebTokenError: invalid token"){
        console.log("Error Catch: Invalid token!");
        var result = {
            status:2,
            description:'jwt错误,请重新登陆',
            result:{
            }
        };

        res.json(result);
        res.end();
    }

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
