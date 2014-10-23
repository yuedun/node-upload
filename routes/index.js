var express = require('express');
var mongoose = require('mongoose');
var qiniu = require('../controller/qiniu');
var token = qiniu.uptoken();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log('token:'+token);
  res.render('index', { title: 'Express', token : token});
});
router.get("/connect",function(req, res){
	mongoose.connect("mongodb://localhost:27017/test",function(e){
		if (e) res.send(e.message);
		res.send("connect yes!");

	});
});

router.post('/upload', function(req, res){
    console.log(req.body);
    console.log(req.files);
    res.render('index', {title:"express"});
});
module.exports = router;
