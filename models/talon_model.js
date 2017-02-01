module.exports = {
  Name: String,
  CanID: {type:Number, required:true},
  OutputType: {type:String, default:"PercentVBus"},
  Output: {type:Number, required:true, default:0.0},
  VoltageOutput: Number,
  VoltageBus: Number,
  CurrentFeedback: Number
}
