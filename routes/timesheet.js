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
    exec("php ./timesheet/event_log.php", function (error, stdout, stderr) {
        res.send(stdout);
    });
});

router.post('/save', function(req, res){

    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }

    // Configure the request
    var options = {
        url: 'http://localhost/timesheet/event_log.php',
        method: 'POST',
        headers: headers,
        form:  req.body
    }

    // Start the request
    request(options, function (error, response, body) {
        console.log(error);
        console.log(body);
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
        }
        res.send(body);

    });    
});

module.exports = router;
