var ConstantValue = require('../models/constant_value');

function emitConstant(){
  console.log('New constants emitted');
  io.emit('constants-updated', {});
}

module.exports = function(app){
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  http.listen(81, function(){
    console.log('Constant update stream socket enabled');
  });

  app.get('/constants', function(req, res, err){
    ConstantValue.find({}, function(err, docs){
      res.send(docs);
    });
  });
  app.get('/constant/:name', function(req, res, err){
    ConstantValue.findOne({Name: req.params.name}, function(err, constant){
      if(err){
        res.send('INTERNAL ERROR');
        return console.error(err);
      }
      if(constant && constant.Value){
        res.send(constant.Value);
        emitConstant();
      }
      else{
        res.send('VALUE NOT FOUND');
      }
    });
  });
  app.post('/constant/set', function(req, res, err){
    var constant = req.body;
    ConstantValue.findOne({Name : constant.Name}, function(err, found){
      if(!found){
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
    var description = req.body.Description;
    var constant = new ConstantValue({
      Name: name,
      Value: value,
      Description: description
    })
    ConstantValue.findOne({Name:constant.Name}, function(err, doc){
      if(!doc){
        constant.save(function(err){
            console.log('New constant ' + constant.Name + ' added with value: ' + constant.Value);
            res.send('Value added');
            emitConstant();
        });
      }
      else{
        res.send('Value already exists');
      }
    });
  });
  app.get('/constant/remove/:name', function(req, res, err){
    console.log('Attempting to remove constant');
    ConstantValue.remove({Name: req.params.name}, function(err){
      console.log('it was removed')
      res.send('done');
      emitConstant();
    });
  });
}
