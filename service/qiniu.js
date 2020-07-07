/**
 * Created by huopanpan on 2014/10/22.
 */
const qiniu = require('qiniu');
const accessKey = 'xxxxx';//需要替换
const secretKey = 'xxxxx';//需要替换
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

let qiniuObj = {};

// @gist uptoken获取token
qiniuObj.uptoken = function uptoken(bucketname, callbackUrl, callbackBody) {
    let options = {
        scope: bucketname,
        // callbackUrl: callbackUrl,
        callbackBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
        callbackBodyType: 'application/json',

    };
    let putPolicy = new qiniu.rs.PutPolicy(options);//只传递一个参数实际上是scope(bucket),其余参数暂不指定
    let uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
}
// @endgist

// @gist downloadUrl
qiniuObj.downloadUrl = function downloadUrl(domain, key) {
    let baseUrl = qiniu.rs.makeBaseUrl(domain, key);
    let policy = new qiniu.rs.GetPolicy();
    return policy.makeRequest(baseUrl);
}

// 字节数组上传（表单方式）
qiniuObj.uploadBuf = function uploadBuf(body, key, uploadToken) {
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var key = 'test.txt';
    formUploader.put(uploadToken, key, "hello world", putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            console.log(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
}

// 文件上传（表单方式）
qiniuObj.uploadFile = function uploadFile(localFile, key, uploadToken) {
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    // 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            console.log(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
}

// 数据流上传（表单方式）
qiniuObj.uploadStream = function uploadBuf(body, key, uploadToken) {
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var readableStream = xxx; // 可读的流
    formUploader.putStream(uploadToken, key, readableStream, putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            console.log(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
}

module.exports = qiniuObj;