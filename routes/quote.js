var express = require('express');
var path = require('path');
var Quote = require('../models/quote');
var router = express.Router();

// router.all('/*', function(req, res, next) {
//     if(!req.isAuthenticated())
//         return res.redirect('/login');
//     next();
// });

//When someone types in localhost:3000/quote takes them to test.jade
router.get('/', function(req, res) {
    res.render('test', {user: req.user});
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
    var request = require('request');

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
           ppmCost      : body.ppmCost,
           gasList      : body.gasList
        }, function(err) {
            if(err) return res.status(500).send(err);
            res.redirect('/');
        });

     request.post( 'http://maps.googleapis.com/maps/api/distancematrix/json?origins=94587&destinations=90210&units=imperial&mode=driving&language=en', function (error, response, body) {
          if (!error && response.statusCode == 200) {
              var json = JSON.parse(body);
              var distance = json.rows[0].elements[0].distance.value
          }
          return res.render('test', {user: req.user, quote: JSON.stringify(quote), distance: distance});
      });
});


module.exports = router;

