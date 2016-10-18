var express = require('express');
var passport = require('passport');
var path = require('path');
var Email = require('../models/email');
var Account = require('../models/account');
var Ticket = require('../models/ticket');
var router = express.Router();
var rooms = {};

router.all('/action/*', function(req, res, next) {
    if(!req.isAuthenticated())
        return res.redirect('/login');
    next();
});

/* GET Handle request to render te index page. If a user is logged in, dispay that user */
router.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

/* GET Handle request for registration page. Render registration page */
router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/trip', function(req, res) {
    res.render('trip');
});

router.get('/action/tickets', function(req, res) {
    if(!req.isAuthenticated())
        return res.render('tickets', {tickets: []});
    Ticket.find({account: req.user._id}, function(err, tickets) {
        //Username to TitleCase
        var username = req.user.username.charAt(0).toUpperCase() + req.user.username.substr(1).toLowerCase();
        res.render('tickets', {user: username, tickets: tickets});
    });
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


router.post('/action/email', function(req, res) {
    var email = req.body;
    Email.create({
        firstname: email.firstname,
        lastname: email.lastname,
        email: email.email
        }, function(err) {
            if(err) return res.status(500).send(err);
            res.redirect('/');
        });
});


/* POST Handle a mailing list through post. If a first name, last name and email is provided, then set new email entry in mongo */

/*router.post('/email', function(req, res) {
    Email.register(new Email({ email : req.body.email }), req.body.email, function(err, email) {
        if (err) {
            return res.render('email', { email : email });
        }
        //Log user in and redirect to the root
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});
*/
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

router.get('/action/join', function(req, res) {
    res.render('join', { user : req.user });
});

/* POST handle a user tryin to join or create a room.
 * If a room exists and invalid password is provided, then send error
 * If the password is valid, send a success signal
 * If it doesn't exist, then create it and add the user to the room*/
/*router.post('/action/checkChat', function(req, res) {
    if (req.body.name in rooms) {
        if (req.body.password !== rooms[req.body.name])
            return res.status(500).send('Invaliad room password');
        return res.send('Success!');
    }
    rooms[req.body.name] = {password: req.body.password, users: [req.user]};
});*/

/* */
/*router.post('/action/chat', function(req, res) {
    if(req.body.name in rooms) {
        //TODO: find a better way to error out for this
        if (req.body.password !== rooms[req.body.name])
            return next();
        rooms[req.body.name].users.push(req.user);
        return res.render('chat', {user: req.user});
    }
    rooms[req.body.name] = {password: req.body.password, users: [req.user]};
    res.render('chat', {user: req.user});
});*/

router.get('/action/chat', function(req, res) {
    res.render('chat', {user: req.user});
});

router.get('/directions', function(req, res) {
    res.render('directions', {user: req.user});
});

router.get('/contact', function(req, res) {
    res.render('contact', {user: req.user});
});

router.get('/email', function(req, res) {
    res.render('email', {user: req.user});
});

router.get('/quote', function(req, res) {
    res.render('quote', {user: req.user});
});



module.exports = router;
