var express = require('express');
var passport = require('passport');
var path = require('path');
var Account = require('../models/account');
var Ticket = require('../models/ticket');
var router = express.Router();

router.all('/action/*', function(req, res, next) {
    if(!req.isAuthenticated())
        return res.redirect('/login');
    next();
});

/* GET Handle request to render te index page. If a user is logged in, dispay that user */
router.get('/', function (req, res) {
    if(!req.isAuthenticated())
        return res.render('index', {tickets: []});
    Ticket.find({account: req.user._id}, function(err, tickets) {
        res.render('index', {user: req.user, tickets: tickets});
    });
});

/* GET Handle request for registration page. Render registration page */
router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/trip', function(req, res) {
    res.render('trip');
});

router.post('/action/ticket', function(req, res) {
    var ticket = req.body;
    Ticket.create({
        account: req.user._id,
        location: ticket.location,
        distance: ticket.distance
        }, function(err) {
            if(err) return res.status(500).send(err);
            res.redirect('/');
        });
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

router.get('/profile', function(req, res) {
    res.render('profile', { user : req.user });
});

/* GET the js for the registration page*/
router.get('/public/javascripts/register.js', function (req, res) {
    res.sendFile(path.resolve('public/javascripts/register.js'));
});

/* GET the js for the index page (will use as demo for video chat)*/
router.get('/public/javascripts/index.js', function(req, res) {
    res.sendFile(path.resolve('public/javascripts/index.js'));
});

/* GET the js for the index page (will use as demo for video chat)*/
router.get('/public/javascripts/rtc.min.js', function(req, res) {
    res.sendFile(path.resolve('public/javascripts/rtc.min.js'));
});

/* GET the js for the index page (will use as demo for video chat)*/
router.get('/public/javascripts/rtc.min.js.map', function(req, res) {
    res.sendFile(path.resolve('public/javascripts/rtc.min.js.map'));
});
module.exports = router;
