var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var newsSchema = new Schema({
  title:String,
  img:String,
  link:String,
  zhihuId:String,
  tengxunId:String,
})

module.export = mongoose.model('News', newsSchema);