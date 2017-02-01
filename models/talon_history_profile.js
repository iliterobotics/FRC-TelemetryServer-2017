var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var talon_model = require('./talon_model');

var talonProfile = new Schema({
  Time:{type:Date, default:Date.now, required:true},
  Profile: {type:talon_model, requred:true}
}, {_id: false});

var TalonHistoryProfile = new Schema({
  talon_profile_id: {type:Schema.Types.ObjectId, required:true},
  Start: {type:Date, default:Date.now},
  End: {type:Date, default:Date.now},
  TalonProfiles: {type:[talonProfile], default:[]}
});

module.exports = mongoose.model('TalonHistoryProfile', TalonHistoryProfile, 'talon_history_profiles');
