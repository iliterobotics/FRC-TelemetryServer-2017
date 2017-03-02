var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LEDStatus = new Schema({
  CurrentStatus: String
}, {_id: false});

module.exports = mongoose.model('LEDStatus', LEDStatus, 'led_status');
