var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Email = new Schema({
	firstname: String,
 	lastname: String,
	email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Email', Email);