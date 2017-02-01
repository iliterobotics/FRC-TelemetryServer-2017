module.exports = function(app){
  require('./routes/talon_route')(app);
  require('./routes/constants')(app);
}
