const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//  use DOTENV for mongoose DB config
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
//  CONNECT TO DB
mongoose.connect(
  process.env.MONGODB,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log('Connect To DB')
);

const app = express();

//  ROUTES
const userRouter = require('./routes/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);

// catch 404 and forward to error handler
// eslint-disable-next-line func-names
// eslint-disable-next-line prefer-arrow-callback
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line func-names
// eslint-disable-next-line prefer-arrow-callback
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
