var createError = require('http-errors');
var express = require('express');
const helmet = require('helmet')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require('nodemailer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
//app.use(helmet.frameguard())
app.use(
  helmet.frameguard({
    action: "deny",
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/sumsub/test', async function(req, res){


  var transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'blackgenius9000@gmail.com',
      pass: 'alechenu'
    }
  });

  var mailOptions = {
    from: 'blackgenius9000@gmail.com',
    to: 'isaacamehgreg@gmail.com',
    subject: 'Testing Sumsub webhook',
    text: JSON.stringify(req.body)
  };

  await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    res.status(404).send('sent');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
