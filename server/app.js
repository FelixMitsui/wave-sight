//Required Packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const path = require('path');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const cors = require("cors");
var logger = require('morgan');
var createError = require('http-errors');
require("dotenv").config({ path: "./config.env" });

//Express App Setup
const app = express();
const router = express.Router();

app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "2100000kb" }));

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true
}));
app.use(cookieParser());


app.use(require("./routes/product"));

const secure = process.env.NODE_ENV === 'production';

const cookieOptions = {
  secure,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
  maxAge: 2000 * 1000,
};

const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.ATLAS_URI,
  collection: 'sessions',
});


app.use(session({
  store: store,
  secret: process.env.SESSION_SECRET,
  name: 'user',
  resave: false,
  saveUninitialized: true,
  proxy: true,
  cookie: cookieOptions
}));


app.use(require("./routes/user"));

//MongoDB connection
const conn = require("./db/conn");

conn.on("error", console.error.bind(console, "MongoDB connection error:"));

conn.once("open", () => {
  console.log("MongoDB already turned on.")
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(require("./routes/index"));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  if (req.originalUrl.startsWith('/api/')) {

    next();

  } else if (process.env.NODE_ENV === 'production') {

    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));

  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

module.exports = app;


