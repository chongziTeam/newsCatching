var News = require('../model/newsModel');
exports.tengxunList = function (req, res) {
	News.find((err, news) => {
    console.log('news')
		res.render('tengxun',{news:news});
	})
}