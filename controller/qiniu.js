/**
 * Created by huopanpan on 2014/10/22.
 */
var qiniu = require('qiniu');
var accessKey = '6CG6fo8XjOhLV-z7g9a-RdfntNFqFEuhTMil-3vy';
var secretKey = 'NxeiNiy1DATcwu_BBrYQCb8GxVREalSHZi7hSzJ9';
// @gist init
qiniu.conf.ACCESS_KEY = accessKey;
qiniu.conf.SECRET_KEY = secretKey;
var qiniuObj ={};
// @endgist

// @gist uptoken获取token
qiniuObj.uptoken = function uptoken(bucketname, callbackUrl, callbackBody) {
    var putPolicy = new qiniu.rs.PutPolicy(bucketname);//只传递一个参数实际上是scope(bucket),其余参数暂不指定
    putPolicy.callbackUrl = callbackUrl;//回调地址，即上传成功后七牛服务器调用我的服务器地址
    putPolicy.callbackBody = callbackBody;
    //putPolicy.returnUrl = returnUrl;
    //putPolicy.returnBody = returnBody;
    //putPolicy.asyncOps = asyncOps;
    //putPolicy.expires = expires;//uptoken过期时间，默认3600s=1小时
    putPolicy.getFlags(putPolicy);
    return putPolicy.token();
}
// @endgist

// @gist downloadUrl
qiniuObj.downloadUrl = function downloadUrl(domain, key) {
    var baseUrl = qiniu.rs.makeBaseUrl(domain, key);
    var policy = new qiniu.rs.GetPolicy();
    return policy.makeRequest(baseUrl);
}
// @endgist
qiniuObj.uploadBuf = function uploadBuf(body, key, uptoken) {
    var extra = new qiniu.io.PutExtra();
    //extra.params = params;
    //extra.mimeType = mimeType;
    //extra.crc32 = crc32;
    //extra.checkCrc = checkCrc;

    qiniu.io.put(uptoken, key, body, extra, function(err, ret) {
        if (!err) {
            // 上传成功， 处理返回值
            console.log(ret.key, ret.hash);
            // ret.key & ret.hash
        } else {
            // 上传失败， 处理返回代码
            console.log(err)
            // http://developer.qiniu.com/docs/v6/api/reference/codes.html
        }
    });
}

qiniuObj.uploadFile = function uploadFile(localFile, key, uptoken) {
    var extra = new qiniu.io.PutExtra();
    //extra.params = params;
    //extra.mimeType = mimeType;
    //extra.crc32 = crc32;
    //extra.checkCrc = checkCrc;

    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log(ret.key, ret.hash);
            // ret.key & ret.hash
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
            // http://developer.qiniu.com/docs/v6/api/reference/codes.html
        }
    });
}
module.exports=qiniuObj;