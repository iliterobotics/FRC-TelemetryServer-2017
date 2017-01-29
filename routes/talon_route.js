var Talon = require('../models/talon_profile');
var TalonHistory = require('../models/talon_history_profile');

var master_talon = new Talon({
  CanID: 0,
  OutputType: "PercentVBus",
  Output: 0.0,
  VoltageOutput: 0.0,
  VoltageBus: 12.5,
  CurrentFeedback: 10
});
master_talon.save(function(err){
  if(err) return console.error(err);
});
var master_talon_history = new TalonHistory({
  talon_profile_id: master_talon._id,
  Start: Date.now(),
  End: null,
  TalonProfiles: [
    {
      Time: Date.now(),
      Profile: master_talon
    }
  ]
});
master_talon_history.save(function(err){
  if(err) return console.error(err);
});

module.exports = function(app){
  app.post('/talons/update/', function(req, res, err){
    new Talon(req.body).save(function(err){
      if(err) return console.error(err);
      res.send('1');
    });
  });
  app.get('/talons/all', function(req, res, err){
    Talon.find({}, function(err, talons){
      if(err) return console.error(err);
      res.send(talons);
    });
  });
  app.get('/talons/updateOutput/:output', function(req, res){
    var newRecord = new Talon(master_talon);
    newRecord.Output = req.params.output;
    TalonHistory.findByIdAndUpdate(master_talon_history._id,
      {$push: {
        TalonProfiles: {
          Time: Date.now(),
          Profile: newRecord
        }
      }
    }, function(err, model){
      if(err) return console.error(err);
    });
    console.log('updating:' + master_talon._id);
    Talon.findByIdAndUpdate(master_talon._id,
      {$set: {
        Output: req.params.output
      }}, {}, function(err, model){
        if(err) console.errror(err);
      }
    );
    res.send('Success');
  });
}
