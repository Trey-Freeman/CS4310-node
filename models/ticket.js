var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ticket = new Schema({
	account: String,
    location: String,
    distance: Number
});

module.exports = mongoose.model('Ticket', Ticket);