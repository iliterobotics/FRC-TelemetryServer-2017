var ConstantValue = require('../models/constant_value');

module.exports = function(app){
  app.get('/test', function(req, res, err){
    res.send('Hello, world!')
  });
  app.get('/constant/:name', function(req, res, err){
    if(err) console.error(err);
    ConstantValue.findOne({Name: req.params.name}, function(err, constant){
      if(err){
        res.send('INTERNAL ERROR');
        return console.error(err);
      }
      if(constant && constant.Value){
        res.send(constant.Value);
      }
      else{
        res.send('VALUE NOT FOUND');
      }
    });
  });
  app.post('/constant/set', function(req, res, err){
    if(err) return console.error(err);
    var constant = req.body;
    ConstantValue.find({Name : constant.Name}, function(err, constant){
      if(!constant){
        res.send('CONSTANT DOES NOT EXIST');
      }
      else {
        ConstantValue.update({Name: constant.Name}, {$set:{Value: constant.Value}},function(err, doc){
          if(err) return console.error(err);
          res.send(doc);
        });
      }
    });
  });
  app.post('/constant/add', function(req, res, err){
    if(err) return console.error(err);
    var name = req.body.Name;
    var value = req.body.Value;
    console.log('adding new constant ...')
    new ConstantValue({
      Name: name,
      value: value
    }).save(function(err){
      if(err){
        res.send('Not saved successfully');
        return console.error(err);
      }
      res.send('added successfully');
    });
  });
}
