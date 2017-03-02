var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogValue = new Schema({
  Name: {type:String, required:true},
  Value: Schema.Types.Mixed
});

var LogValueHistory = new Schema({
  Name: {type:String, required:true},
  Value: Schema.Types.Mixed,
  Time: Date
});

module.exports = { LogValue : mongoose.model('LogValue', LogValue, 'logvalues'),
                   LogValueHistory : mongoose.model('LogValueHistory', LogValueHistory, 'log_history')};
