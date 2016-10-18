var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Email = new Schema({
	firstname: String,
    lastname: String,
    email: String
});

module.exports = mongoose.model('Email', Email);