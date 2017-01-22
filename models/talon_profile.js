var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Talon = new Schema({
  CanID: Number
});

module.exports = mongoose.model('Talon', Talon, 'talons');
