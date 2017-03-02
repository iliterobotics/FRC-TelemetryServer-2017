var {LogValue, LogValueHistory} = require('../models/log_values');

module.exports = function(app){
  app.get('/logvals', function(req, res, err){
    LogValue.find({}, function(err, docs){
      res.send(docs);
    });
  });
  app.get('/logvals/:name', function(req, res, err){
    getValue(req.params.name, function(err, value){
      if(err){
        res.send(err);
        return console.error(err);
      }
      if(value){
        res.send(value.Value);
      }
      else{
        res.send('VALUE NOT FOUND');
      }
    });
  });
  app.post('/constant/set', function(req, res, err){
    var value = req.body;
    doesValueExist(name, function(err, doesExist){
      if(!doesExist){
        addValue(name, handleError);
      }
      LogValue.update({Name: constant.Name}, {$set:{Value: constant.Value}},function(err, doc){
        if(err) return console.error(err);
        res.send(doc);
      });
    });
  });
  app.get('/constant/:name/:value', function(req, res, err){
    console.log('Got constant update');
    var constant = {
      Name: req.params.name,
      Value: req.params.value
    };
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
  app.get('/constant/add/:name/:value', function(req, res, err){
    var name = req.params.name;
    var value = req.params.value;
    var description = "";
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
  app.post('/constant/add', function(req, res, err){
    var name = req.body.Name;
    var value = req.body.Value;
    var description = req.body.Description;
    var constant = new ConstantValue({
      Name: name,
      Value: value,
      Description: description
    })
    LogValue.findOne({Name:constant.Name}, function(err, doc){
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
}

//Callback passes values of (error, document)
function getValue(name, callback){
  LogValue.findOne({Name:name}, callback);
}

//Callback passes values of (error, boolean)
function doesValueExist(name, callback){
  getValue(name, function(err, doc){
    callback(err, !!doc);
  });
}


function addValue(name, callback){
  doesValueExist(name, function(err, doesExist){
    if(!doesExist){
      var newVal = new Value({Name:name});
      newVal.save(function(err){
        callback(err);
      });
    }
  });
}

function updateValue(name, newval){
  getValue(name, function(err, value){
    if(!value){
      addValue(name, handleError);
    }
    var logHist = new LogValueHistory({
      Name: value.name,
      Value: value.value,
      Time: Date.getTime()
    });
    logHist.save(function(err){
      LogValue.update({Name: constant.Name}, {$set:{Value: constant.Value}},function(err, doc){
        if(err) return console.error(err);
        res.send(doc);
      });      
    });
  });
}

function handleError(err){
  if(err){
    return console.error(err);
  }
}
