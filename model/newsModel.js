var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title:String,
  img:String,
  link:String,
  zhihuId:String,
  id:String,
  typeTag:String,
  time:String,
  isTop:Boolean,
})

module.exports = mongoose.model('News', NewsSchema);