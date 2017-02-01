var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConstantValue = new Schema({
  Name: {type:String, required:true},
  Description: String,
  Value: Schema.Types.Mixed
});

module.exports = mongoose.model('ConstantValue', ConstantValue, 'constants');
