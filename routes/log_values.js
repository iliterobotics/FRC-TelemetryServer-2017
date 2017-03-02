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
  app.post('/logvals/set', function(req, res, err){
    var value = req.body;
    updateValue(value.Name, value.Value);
    res.send('Success');
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
      console.log('Does not exist, adding a new value');
      var newVal = new LogValue({Name:name});
      newVal.save(function(err){
        callback(err);
      });
    }
  });
}

function updateValue(name, newval){
  console.log('Setting value: ' + name + ' to: ' + newval);
  getValue(name, function(err, value){
    if(!value){
      addValue(name, handleError);
    }
    var logHist = new LogValueHistory({
      Name: value.Name,
      Value: newval,
      Time: Date.now()
    });
    logHist.save(function(err){
      LogValue.update({Name: value.Name}, {$set:{Value: newval}},function(err, doc){
        if(err) console.error(err);
      });
    });
  });
}

function handleError(err){
  if(err){
    return console.error(err);
  }
}
