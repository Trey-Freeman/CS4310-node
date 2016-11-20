var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Timesheet = new Schema({
  account: String,
  startdate: Date,
  enddate: Date,
  createdAt: { type: Date, default: Date.now },
  comments: String
});

module.exports = mongoose.model('Timesheet', Timesheet);