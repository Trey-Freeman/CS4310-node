var express = require('express');
var path = require('path');
var Quote = require('../models/quote');
var router = express.Router();
const http = require('http');

router.all('/*', function(req, res, next) {
    if(!req.isAuthenticated())
        return res.redirect('/login');
    next();
});

//When someone types in localhost:3000/quote takes them to test.jade
router.get('/', function(req, res) {
    res.render('quote', {user: req.user});
});


router.post('/po', function(req, res) {
    var quote = req.body;
    console.log(req.body);
    Quote.create({
          account       : req.user._id,
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
    return res.render('quote', {user: req.user, quote: quote, distance: distance});
});


router.post('/make', function(req, res) {
    var request = require('request');
    var quote = req.body;
    var quote = new Quote({
          account      : req.user._id,
          id           : body.id,
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
          ppmCost      : quote.ppmCost,
          gasList      : body.gasList
        }, function(err) {
            if(err) return res.status(500).send(err);
            res.redirect('/');
        });
    return res.render('viewQuote', {user: req.user, quote: quote, distance: distance});
});

router.post('/create', function(req, res) {

  var request = require('request');

  var inputValue = req.body.action;


     var body       = req.body;
     var quote = new Quote({
          account       : req.user._id,
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
     //console.log(quote[collection].getIndexes());
      // var myDocument = Quote.findOne();

      // if (myDocument) {
      //    var myName = myDocument.name;

      //    console.log(myName);
      // }
      // console.log(Quote.findOne(
      //   { _id:  }
      //   ));
      // var tst = Quote.find({},{origin:1, _id:1});
    //   var tst = Quote.findOne({_id: "5818f3356b85473b50d0e278"}, function(err, quotes) {
    //     //Username to TitleCase

    //     // var qoteid = req.quote.origin;
    //     // console.log(" ******** " + quoteid);
    //     console.log(" ******** " + quotes.origin);
    // });
       
      //JSON.stringify(tst);
      
  request.post( 'http://maps.googleapis.com/maps/api/distancematrix/json?origins=' + body.origin + '&destinations=' + body.destination + '&units=imperial&mode=driving&language=en', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            var distance = json.rows[0].elements[0].distance.value
        } else {
          return res.redirect('/quote')
        }

        if (inputValue == "Submit") {
          return res.render('quote', {user: req.user, quote: quote, distance: distance});
        }
        else if (inputValue == "/quote/make") {
          return res.render('viewQuote', {user: req.user, quote: quote, distance: distance});
        }
        else if (inputValue == "/quote/print") {

          return res.render('printQuote', {user: req.user, quote: quote, distance: distance});
        }
        else if (inputValue == "/quote/po") {
          //todo: save to db

           quote.save (function(err){
                  if(err) return res.status(500).send(err);
           });
          Quote.count(function(err, quotes) {

            //console.log(quotes)
          var count = 1 + Number(quotes)
           //console.log(count);
          return res.render('viewQuote', {user: req.user, quote: quote, distance: distance, count: count});

          })
          
        }
         else {
          console.log('route error');
        }            
  });
});

router.get('/list', function(req, res) {
    Quote.find({account: req.user._id}, function(err, quotes) {
        var username = req.user.username.charAt(0).toUpperCase() + req.user.username.substr(1).toLowerCase();
        res.render('summaryQuote', {user: username, quotes: quotes});
    });
});

router.post('/delete', function(req, res) {
    var quoteID = req.body.id
    Quote.remove({ _id: quoteID }, function(err) {
        if (err) return res.status(500).send(err);
    });
    res.send('success');
})


module.exports = router;

