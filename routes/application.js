var express = require('express');
var passport = require('passport');
var path = require('path');
//var Application = require('../models/application');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('application', {user: req.user});
});

router.post('/new', function (req, res) {
    var app = req.body;
    Application.create({
      First_Name: app.First_Name,
      Last_Name: app.Last_Name,
      ssn: app.ssn,
      Street: app.Street,
      city: app.city,
      state: app.state,
      zip: app.zip,
      school: app.school,
      degree: app.degree,
      Gdate: app.Gdate,
      major: app.major,
      Email_Address: app.Email_Address,
      Portfolio: app.Portfolio,
      Position: app.Position,
      Salary: app.Salary,
      StartDate: app.StartDate,
      Phone: app.Phone,
      Fax: app.Fax,
      Relocate: app.Relocate,
      Organization: app.Organization,
      Resume: app.Resume
        }, function(err) {
            if(err) return res.status(500).send('Error saving new application.');
            return res.redirect('post_app');
    });
});

module.exports = router;