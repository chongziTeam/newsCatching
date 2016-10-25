var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var newsSchema = new Schema({
  title:String,
  img:String,
  link:String,
  zhihuId:String,
  tengxunId:String,
})

module.exports = mongoose.model('News', newsSchema);