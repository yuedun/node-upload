const express = require('express');
const qiniu = require('../service/qiniu');
const formidable = require('formidable');
const fs = require('fs');
const token = qiniu.uptoken('hopefully', 'http://localhost:3000/success', 'x:username=hope');
const router = express.Router();
const TITLE = 'formidable上传示例';
const AVATAR_UPLOAD_FOLDER = '/avatar/';

/* GET home page.七牛上传 */
router.get('/', function (req, res) {
    res.render('index', { title: '七牛文件上传测试', token: token, username: 'hope' });
});

/* 上传成功后调用的地址 */
router.post('/success', function (req, res) {
    var username = req.body.username;
    res.write('{"success":true,"username":"' + username + '"}');
});

/* formidable文件上传 */
router.get('/formUpload', function (req, res) {
    res.render('formupload', { title: TITLE });
});

/* formidable文件上传 */
router.post('/toUpload', function (req, res) {
    var form = new formidable.IncomingForm();//创建上传表单
    form.encoding = 'utf-8';//设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;//设置上传目录
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;//文件大小
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.locals.error = err;
            res.render('formupload', { title: TITLE });
            return;
        }
        var extName = '';//后缀名
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            res.render('formupload', { title: TITLE });
            return;
        }
        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;

        console.log('newPath:' + newPath);
        fs.renameSync(files.file.path, newPath);//重命名
        qiniu.uploadFile(newPath, avatarName, token);
    });
    res.locals.success = '上传成功';
    res.render('formupload', { title: TITLE });
});

module.exports = router;
