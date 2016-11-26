var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Applicaiton = new Schema({
    First_Name: String,
    Last_Name: String,
    ssn: String,
    Street: String,
    city: String,
    state: String,
    zip: String,
    school: String,
    degree: String,
    Gdate: String,
    major: String,
    Email_Address: String,
    Portfolio: String,
    Position: String,
    Salary: String,
    StartDate: String,
    Phone: String,
    Fax: String,
    Relocate: String,
    Organization: String,
    Resume: String
});

module.exports = mongoose.model('Applicaiton', Applicaiton);