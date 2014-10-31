var express = require('express');
var mongoose = require('mongoose');
var qiniu = require('../controller/qiniu');
var client = require('../controller/qn');
var token = qiniu.uptoken('hopefully');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express'});
});
router.get("/connect",function(req, res){
	mongoose.connect("mongodb://localhost:27017/test",function(e){
		if (e) res.send(e.message);
		res.send("connect yes!");

	});
});

router.post('/upload', function(req, res){
    // upload a file with custom key
    client.uploadFile('C:\Users\huopanpan\Pictures\sdfsd.jpg', {key: 'qn/lib/client.js'}, function (err, result) {
        console.log(result);
        // {
        //   hash: 'FhGbwBlFASLrZp2d16Am2bP5A9Ut',
        //   key: 'qn/lib/client.js',
        //   url: 'http://qtestbucket.qiniudn.com/qn/lib/client.js'
        //   "x:ctime": "1378150371",
        //   "x:filename": "client.js",
        //   "x:mtime": "1378150359",
        //   "x:size": "21944",
        // }
    });
    res.render('index', {title:"express"});
});
module.exports = router;
