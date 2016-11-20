var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Timesheet = new Schema({
  account: String,
  startDate: Date,
  endDate: Date,
  hours: Number,
  rate: Number,
  createdAt: { type: Date, default: Date.now },
  comments: String
});

module.exports = mongoose.model('Timesheet', Timesheet);