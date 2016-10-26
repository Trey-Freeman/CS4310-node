var express = require('express');
var path = require('path');
var Quote = require('../models/quote');
var router = express.Router();


router.post('/quote/po', function(req, res) {
    var quote = req.body;
    console.log(req.body);
    Quote.create({
           id           : quote.id;
           origin       : quote.origin;
           destination  : quote.destination;
           price        : quote.price;
           mpg          : quote.mpg;
           distance     : quote.distance;
           gasType      : quote.gasType; 
           ppm          : quote.ppm;
           gallons      : quote.gallons;
           gasCost      : quote.gasCost;
           totalCost    : quote.totalCost;
           ppmCost      : quote.ppmCost;
        }, function(err) {
            if(err) return res.status(500).send(err);
            res.redirect('/');
        });
});


router.post('/quote/make', function(req, res) {
    var quote = req.body;
    Quote.create({
           origin       : quote.origin;
           destination  : quote.destination;
           price        : quote.price;
           mpg          : quote.mpg;
           distance     : quote.distance;
           gasType      : quote.gasType; 
           ppm          : quote.ppm;
           gallons      : quote.gallons;
           gasCost      : quote.gasCost;
           totalCost    : quote.totalCost;
           ppmCost      : quote.ppmCost;
        }, function(err) {
            if(err) return res.status(500).send(err);
            res.redirect('/');
        });
});

router.post('/create', function(req, res) {
     var quote       = req.body;
     var origin       = quote.origin;
     var destination  = quote.destination;
     var price        = quote.price;
     var mpg          = quote.mpg;
     var distance     = quote.distance;

});

module.exports = router;

