var request = require('request');

var body = {
  Name:'Test_constant',
  Value:-0.9
}

request({
  url:'http://localhost/constant/add',
  method:'POST',
  json: body
}, function(err, res, body){
  console.log('success!');
});
