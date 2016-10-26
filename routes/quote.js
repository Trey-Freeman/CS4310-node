var express = require('express');
var path = require('path');
var Quote = require('../models/quote');
var router = express.Router();

router.all('/*', function(req, res, next) {
    if(!req.isAuthenticated())
        return res.redirect('/login');
    next();
});


router.post('/po', function(req, res) {
    var quote = req.body;
    console.log(req.body);
    Quote.create({
           id           : quote.id,
           origin       : quote.origin,
           destination  : quote.destination,
           price        : quote.price,
           mpg          : quote.mpg,
           distance     : quote.distance,
           gasType      : quote.gasType,
           ppm          : quote.ppm,
           gallons      : quote.gallons,
           gasCost      : quote.gasCost,
           totalCost    : quote.totalCost,
           ppmCost      : quote.ppmCost
        }, function(err) {
            if(err) return res.status(500).send(err);
            res.redirect('/');
        });
});


router.post('/make', function(req, res) {
    var quote = req.body;
    Quote.create({
           origin       : quote.origin,
           destination  : quote.destination,
           price        : quote.price,
           mpg          : quote.mpg,
           distance     : quote.distance,
           gasType      : quote.gasType,
           ppm          : quote.ppm,
           gallons      : quote.gallons,
           gasCost      : quote.gasCost,
           totalCost    : quote.totalCost,
           ppmCost      : quote.ppmCost
        }, function(err) {
            if(err) return res.status(500).send(err);
            res.redirect('/');
        });
});

router.post('/create', function(req, res) {
    console.log("create route");
    console.log(req.body);
     var body       = req.body;
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
     //quote.save (function(err){
            // if(err) return res.status(500).send(err);
            // res.redirect('/');
     //});
     console.log(quote);
     res.render('test', {user: req.user, quote: quote});

});


module.exports = router;

