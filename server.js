var express = require('express');
var path = require('path'); 
var mongoose = require('mongoose');
var phantomjs = require('phantomjs');
var dbConnection = 'mongodb://localhost/news';
mongoose.connect(dbConnection);
var port = process.env.PORT || 8080;
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
require('./router')(app);
app.listen(port, function(){
    console.log(`Express server listening on port ${port}`);
});
