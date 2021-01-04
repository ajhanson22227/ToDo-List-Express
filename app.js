/* eslint-disable func-names */
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
  // eslint-disable-next-line no-console
  () => console.log('Connect To DB'),
);

const app = express();

const cors = require('cors');

app.use(cors());

//  ROUTES
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const taskRouter = require('./routes/task');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/task', taskRouter);

// catch 404 and forward to error handler
// eslint-disable-next-line prefer-arrow-callback
app.use(function (req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, user-token');
  next();
});

// error handler
// eslint-disable-next-line prefer-arrow-callback
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
