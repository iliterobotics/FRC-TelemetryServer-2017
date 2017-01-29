var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var talon_model = require('./talon_model')

var Talon = new Schema(talon_model);

module.exports = mongoose.model('Talon', Talon, 'talons');
