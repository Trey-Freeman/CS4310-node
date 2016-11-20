var express = require('express');
var path = require('path');
var exec = require("child_process").exec;
var request = require('request');

var router = express.Router();

// router.all('/*', function(req, res, next) {
//     if(!req.isAuthenticated())
//         return res.redirect('/login');
//     next();
// });

/* Test Code for Zaid's PHP timesheet */
router.get('/', function(req, res){
    res.render('timesheet');
});

router.post('/save', function(req, res){
   
});

module.exports = router;
