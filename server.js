var express = require('express');
var path = require('path'); 
var mongoose = require('mongoose');
var phantomjs = require('phantomjs');
var dbConnection = 'mongodb://localhost/news';
mongoose.connect(dbConnection);
var port = process.env.PORT || 8080;
var app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
require('./router')(app);
app.listen(port, function(){
    console.log(`Express server listening on port ${port}`);
});
