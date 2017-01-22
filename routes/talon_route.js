var Talon = require('../models/talon_profile');

module.exports = function(app){
  app.post('/talons/update', function(req, res, err){
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
}
