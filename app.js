const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ECT = require('ect');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

const routes = require('./routes');

const app = express();
const ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

/*** view engine setup ***/
app.engine('ect', ectRenderer.render);
app.set('view engine', 'ect');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*** configure session and passport ***/
app.use(session({
  secret            : 'keyboard cat',
  resave            : false,
  saveUninitialized : true,
  /* cookie          : { secure: true } // Need https */
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(app);


/*** routing ***/
app.use('/', routes.top);
app.use('/api', routes.api);
app.use('/dashboard', routes.dashboard);
app.use('/login', routes.login);

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
