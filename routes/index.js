var express = require('express');
var passport = require('passport');
var path = require('path');
var Account = require('../models/account');
var router = express.Router();

/* GET Handle request to render te index page. If a user is logged in, dispay that user */
router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

/* GET Handle request for registration page. Render registration page */
router.get('/register', function(req, res) {
    res.render('register');
});

/* POST Handle a registration through post. If a username and password is provided, then set new account entry in mongo */
router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }
        //Log user in and redirect to the root
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

/* GET handle request for the login page. If a user is already signed in, then redirect to root */
router.get('/login', function(req, res) {
    //If User is already logged in, then return to the index page
    if(req.isAuthenticated())
        return res.redirect('/');
    res.render('login');
});

/* POST handle login request */
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

/* GET the js for the registration page*/
router.get('/public/javascripts/register.js', function (req, res, next) {
    res.sendFile(path.resolve('public/javascripts/register.js'));
});

module.exports = router;
