var express = require('express');
var Timesheet = require('../models/timesheet');
var Account = require('../models/account');
var path = require('path');
var exec = require("child_process").exec;
var request = require('request');

var router = express.Router();

router.all('/*', function(req, res, next) {
    if(!req.isAuthenticated())
        return res.redirect('/login');
    next();
});

router.get('/', function(req, res){
    return res.render('timesheet', {user: req.user});
});

router.post('/save', function(req, res) {
    var timesheet = req.body;
    Timesheet.create({
        account: req.user._id,
        startDate: timesheet.startDate,
        endDate: timesheet.endDate,
        hours: timesheet.hours,
        rate: timesheet.rate,
        comments: timesheet.comments
        }, function(err) {
            if(err) return res.status(500).send('Error saving new timesheet');
            return res.redirect('/timesheet/list');
    });
});

router.get('/list', function(req, res) {
    Account.findOne({_id: req.user._id}, function(err, user) {
        if(err) return res.status(500).send(err);
        if(user.admin) {
            Timesheet.find({}, function(err, timesheets) {
                if(err) return res.status(500).send(err);
                var username = req.user.username.charAt(0).toUpperCase() + req.user.username.substr(1).toLowerCase();
                return res.render('timesheets', {user: user, timesheets: timesheets});
            });
        } else {
            Timesheet.find({account: req.user._id}, function(err, timesheets) {
                console.log(timesheets);
                if(err) return res.status(500).send(err);
                var username = req.user.username.charAt(0).toUpperCase() + req.user.username.substr(1).toLowerCase();
                return res.render('timesheets', {user: user, timesheets: timesheets});
            });
        }
    })
    
});

router.get('/edit/:timesheetId', function(req, res) {
    Account.findOne({_id: req.user._id}, function(err, user) {
        if(err) return res.status(500).send(err);
        Timesheet.find({account: req.user._id}, function(err, timesheets) {
            if(err) return res.status(500).send(err);
            var username = req.user.username.charAt(0).toUpperCase() + req.user.username.substr(1).toLowerCase();
            var timesheetId = req.params.timesheetId;
            var n = req.query.n;
            return res.render('edit_timesheet', {user: user, timesheets: timesheets, timesheetId: timesheetId, n: n});
        });
    })
    
});

router.post('/edit/:timesheetId', function(req, res) {
    var timesheet = req.body;

    //Update it
    Timesheet.update({_id: req.params.timesheetId}, {
        startDate: timesheet.startDate,
        endDate: timesheet.endDate,
        hours: timesheet.hours,
        rate: timesheet.rate,
        comments: timesheet.comments
    }, function (err) {
      if (err) {
          res.send("There was a problem updating the information to the database: " + err);
      } 
      else {
              //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
              res.format({
                  html: function(){
                       res.redirect('/timesheet/list');
                 },
                 //JSON responds showing the updated values
                json: function(){
                       res.json(Timesheet);
                 }
              });
       }
    })

});

router.post('/delete', function(req, res) {
    var timesheetID = req.body.id
    Timesheet.remove({ _id: timesheetID }, function(err) {
        if (err) return res.status(500).send(err);
    });
    res.send('success');
});


module.exports = router;