// dependencies
var express = require('express');
var multer = require('multer');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Route includes
var routes = require('./routes/index');
var users = require('./routes/users');
var quote = require('./routes/quote');
var timesheet = require('./routes/timesheet');
var application = require('./routes/application');

var app = express();

app.use(multer({dest:'./public/profile_pics'}).single('image'));
//test
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/th.jpeg'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//Route files
app.use('/', routes);
app.use('/quote', quote);
app.use('/timesheet', timesheet);
app.use('/application', application);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
if (process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI);
else
    mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');


module.exports = app;
