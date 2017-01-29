var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var talon_model = require('./talon_model');

var talonProfile = new Schema({
  Time:{type:Date, default:Date.now},
  Profile: talon_model
}, {_id: false});

var TalonHistoryProfile = new Schema({
  talon_profile_id: String,
  Start: {type:Date, default:Date.now},
  End: {type:Date, default:Date.now},
  TalonProfiles: [talonProfile]
});

module.exports = mongoose.model('TalonHistoryProfile', TalonHistoryProfile, 'talon_history_profiles');
