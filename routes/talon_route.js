var Talon = require('../models/talon_profile');
var TalonHistory = require('../models/talon_history_profile');

module.exports = function(app){
  app.post('/talons/update/', function(req, res, err){
    if(err) return console.error(err);
    new Talon(req.body).save(function(err){
      if(err) return console.error(err);
      res.send('1');
    });
  });
  app.get('/talons/all', function(req, res, err){
    if(err) return console.error(err);
    Talon.find({}, function(err, talons){
      if(err) return console.error(err);
      res.send(talons);
    });
  });
  app.get('/talons/add/:id/:name', function(req, res, err){
    if(err) return console.error(err);
    Talon.find({ CanID: req.params.id}, function(err, docs){
      
    })
  });
}
