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

require('./routes')(app);
app.use(bodyParser);

//MongoDB setup
mongoose.connect('mongodb://localhost/telem-server');
const db = mongoose.connection;
db.on('error', console.log)
db.on('disconnected', app.connect)
db.once('open', listen);
