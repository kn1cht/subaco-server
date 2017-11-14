const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ECT = require('ect');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mysql = require('mysql');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

const index = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');
const api = require('./routes/api');

const app = express();
const ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'test_user',
  password: process.env.DB_PASS || 'test_password',
  database: process.env.DB_NAME || 'SUBACO_test'
});

// view engine setup
app.engine('ect', ectRenderer.render);
app.set('view engine', 'ect');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/api', api);

// configure passport
require('./config/passport')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.title = err.message;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
