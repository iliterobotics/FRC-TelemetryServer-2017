module.exports = function(app){
  require('./routes/talon_route')(app);
  require('./routes/constants')(app);
  require('./routes/log_values')(app);
}
