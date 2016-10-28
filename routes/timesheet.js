var express = require('express');
var path = require('path');
var exec = require("child_process").exec;

var router = express.Router();

router.all('/*', function(req, res, next) {
    if(!req.isAuthenticated())
        return res.redirect('/login');
    next();
});

/* Test Code for Zaid's PHP timesheet */
router.get('/', function(req, res){
    exec("php ./timesheet/event_log.php", function (error, stdout, stderr) {
        res.send(stdout);
    });
});

router.post('/save', function(req, res){
    // exec("php ./timesheet/event_log.php", function (error, stdout, stderr) {
    //     res.send(stdout);
    // });
    res.redirect('/timesheet')
});

module.exports = router;
