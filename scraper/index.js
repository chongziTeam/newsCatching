var mongoose = require('mongoose');
var dbConnectionString = 'mongodb://localhost/news';
mongoose.connect(dbConnectionString);
var schedule = require('node-schedule');
var getNewsFromsohu = require('./sohu').getNewsFromsohu;

schedule.scheduleJob('0,0,0,*,*,*',getNewsFromsohu);