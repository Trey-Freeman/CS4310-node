var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Quote = new Schema({
   id           : String,
   origin       : String,
   destination  : String,
   price        : String,
   mpg          : String, 
   distance     : String,
   gasType      : String, 
   ppm          : String,
   gallons      : String,
   gasCost      : String,
   totalCost    : String,
   ppmCost      : String,
   gasList      : String

  //email: { type: String,, required: true, unique: true }
});

module.exports = mongoose.model('Quote', Quote);