var ConstantValue = require('../models/constant_value');

module.exports = function(app){
  app.get('/constant/:name', function(req, res, err){
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
    var name = req.body.Name;
    var value = req.body.Value;
    var constant = new ConstantValue({
      Name: name,
      Value: value
    })
    ConstantValue.findOne({Name:constant.Name}, function(err, doc){
      if(!doc){
        constant.save(function(err){
            console.log('New constant ' + constant.Name + ' added with value: ' + constant.Value);
            res.send('Value added');
        });
      }
      else{
        res.send('Value already exists');
      }
    });
  });
}
