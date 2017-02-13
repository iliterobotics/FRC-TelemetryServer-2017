var request = require('request');

var constants = [{
  Name:'kP',
  Value:0.003
},
{
  Name:'Test_constant',
  Value:-0.9
},
{
  Name:'angle_offset',
  Value:32
},
{
  Name:'scaling',
  Value:true
}]
constants.forEach(function(data){
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
});
