var express = require('express');
var Timesheet = require('../models/timesheet');
var path = require('path');
var exec = require("child_process").exec;
var request = require('request');

var router = express.Router();

router.all('/*', function(req, res, next) {
    if(!req.isAuthenticated())
        return res.redirect('/login');
    next();
});

/* Test Code for Zaid's PHP timesheet */
router.get('/', function(req, res){
    res.render('timesheet');
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
            if(err) return res.status(500).send(err);
    });
    console.log(timesheet);
    res.render('timesheets');
});

router.get('/list', function(req, res) {
    Timesheet.find({account: req.user._id}, function(err, timesheets) {
      console.log(timesheets);
        var username = req.user.username.charAt(0).toUpperCase() + req.user.username.substr(1).toLowerCase();
        res.render('timesheets', {user: username, timesheets: timesheets});
    });
});

module.exports = router;
