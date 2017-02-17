const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.port || 80;

const app = express();

function listen(){
  app.listen(port, function(){
    console.log('Express app started on port ' + port);
  });
}

module.exports = app;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MongoDB setup
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://127.0.0.1/telem-server');
const db = mongoose.connection;
db.on('error', (err) =>{
  console.log(err);
});
db.on('disconnected', (obj) => {
  console.log(obj);
});
db.once('open', listen);

require('./routes')(app);
