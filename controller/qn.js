/**
 * Created by huopanpan on 2014/10/31.
 */
var qn = require('qn');

var client = qn.create({
    accessKey: '6CG6fo8XjOhLV-z7g9a-RdfntNFqFEuhTMil-3vy',
    secretKey: 'NxeiNiy1DATcwu_BBrYQCb8GxVREalSHZi7hSzJ9',
    bucket: 'hopefully',
    domain: 'http://{bucket}.u.qiniudn.com'
    // timeout: 3600000, // default rpc timeout: one hour, optional
    // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
    // uploadURL: 'http://up.qiniu.com/',
});


module.exports = client;