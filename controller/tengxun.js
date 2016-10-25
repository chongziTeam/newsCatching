var News = require('../model/newsModel');

exports.tengxunList = function (req, res) {
	News.find((err, news) => {
		res.render('tengxun',{news:news});
	})
}