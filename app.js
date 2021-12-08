var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const handlebars = require("express-handlebars");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.engine("handlebars", handlebars({
  helpers: require(`${__dirname}/views/helpers`),
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/webfonts", express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free/webfonts`));

app.use("/js", [
  express.static(__dirname+'/node_modules/jquery/dist/'),
  express.static(__dirname+'/node_modules/popper.js/dist/umd'),
  express.static(__dirname+'/node_modules/bootstrap/dist/js'),
  express.static(__dirname+'/public/js'),
]);

app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/img", express.static(`${__dirname}/public/images`));
app.use("/assets", express.static(`${__dirname}/public/assets`));

app.use(indexRouter);
app.use(usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(express.urlencoded({ extended: false }));

/*/ error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

const PORT = process.env.PORT || 4000;
app.listen(PORT);

module.exports = app;
