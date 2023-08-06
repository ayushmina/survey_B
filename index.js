var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let db=require("./db.connect");



var app = express();
var cors=require("cors")

// Allow cors
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

app.use("/public", express.static("public"));

db.mongoConnect();

// app.use('/', indexRouter);

app.use('/admin', usersRouter.adminRoutes);
app.use('/websites', usersRouter.websitesRoutes);

// error handler

const PORT = process.env.PORT || 4044;
app.listen(PORT, (err) => {
  if (err) return console.log("PORT ISSUE", err);
  console.log(`Server running on PORT ${PORT}`);
});

module.exports = app;
