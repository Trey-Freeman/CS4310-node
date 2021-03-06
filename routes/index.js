var express = require('express');
var passport = require('passport');
var XmlDocument = require('xmldoc');
var path = require('path');
// var Quote = require('../models/quote');
var Email = require('../models/email');
var Account = require('../models/account');
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

/* POST Handle a registration through post. If a username and password is provided, then set new account entry in mongo */
router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, email : req.body.email, pic : '/images/cat.jpg' }), req.body.password, function(err, account) {
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
    });
    res.redirect('/email');
});


router.post('/action/profile', function(req, res) {
    var profile = req.body;
    var file = req.file;
    Account.findOne({username: req.user.username}, function (err, user) {
        user.email = profile.email;

        // If the user uploads a file delete the old
        // and create a link in the model to that new picture.
        if (file !== undefined){
            var fs = require('fs');
            var filePath = './public' + user.pic; //delete the old picture
            
            //Delete pic if not the default one
            if (filePath != './public/images/cat.jpg') {
               fs.unlink(filePath ,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                }); 
            }
                
            user.pic = "/profile_pics/" + file['filename'];
        }

        user.save(function (err) {
            if (err) return res.send(500, { error: err });
        });

        res.render("profile", {user: user});
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
    if(!req.isAuthenticated())
        return res.redirect('/login');

    res.render('profile', { user : req.user });
});

router.get('/action/join', function(req, res) {
    res.render('join', { user : req.user });
});undefined

router.post('/create', function(req, res) {
    console.log("create route");
    console.log(req.body);
     var body = req.body;
     var quote = new Quote({
           id           : body.id,
           origin       : body.origin,
           destination  : body.destination,
           price        : body.price,
           mpg          : body.mpg,
           distance     : body.distance,
           gasType      : body.gasType, 
           ppm          : body.ppm,
           gallons      : body.gallons,
           gasCost      : body.gasCost,
           totalCost    : body.totalCost,
           ppmCost      : body.ppmCost
        }, function(err) {
            if(err) return res.status(500).send(err);
            res.redirect('/');
        });
     res.render('quote', {user: req.user, quote: quote});

});


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

router.get('/quote/create', function(req, res) {
    res.render('quote', {user: req.user});
});

router.get('/viewQuote', function(req, res) {
    res.render('viewQuote', {user: req.user, quote: quote, distance: distance});
});

router.get('/summaryQuote', function(req, res) {
    res.render('summaryQuote');
});

router.get('/snake', function(req, res) {
    res.render('snake');
});


router.get('/complaint', function(req, res) {
    res.render('complaint', {user: req.user});
});

router.post('/submitComplaint', function(req, res) {
    var body = req.body;
    res.render('index');
});


module.exports = router;
