var request = require('request');
var i = 0;

var sendVal = function(){
  i++;
  request({
    url:'http://localhost/logvals/set',
    method: "POST",
    json: true,
    headers: {
      'content-type': 'application/json',
    },
    body: {
      Name:'counter',
      Value:i
    }
  }, function(err, res, body){
    console.log('success!');
  });
}

setInterval(sendVal, 500);
