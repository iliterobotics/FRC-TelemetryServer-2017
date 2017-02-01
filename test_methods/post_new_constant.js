var request = require('request');

var data = {
  Name:'Test_constant',
  Value:-0.9
}

console.log(JSON.stringify(data));

request({
  url:'http://localhost/constant/add',
  method: "POST",
  json: true,
  headers: {
    'content-type': 'application/json',
  },
  body: data
}, function(err, res, body){
  console.log('success!');
});
