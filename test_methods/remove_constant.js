var request = require('request');

request({
  url:'http://localhost/constant/cat',
  method: "DELETE",
  json: true,
  headers: {
    'content-type': 'application/json',
  },
  body: null
}, function(err, res, body){
  console.log('success!');
});
