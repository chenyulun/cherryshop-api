const assert = require('assert');
const qiniu = require('qiniu');

function checkBucketConfig(app, config) {
  assert(config.ak, '[qiniu] ak is required on config');
  app.coreLogger.info('[qiniu] init %s', config.ak);
}
module.exports = app => {
  app.addSingleton('qiniu', (config, app) => {
    config = Object.assign({}, config, { urllib: app.httpclient });
    checkBucketConfig(app, config.qiniu);
    // 需要填写你的 Access Key 和 Secret Key
    qiniu.conf.ACCESS_KEY = config.qiniu.ak;
    qiniu.conf.SECRET_KEY = config.qiniu.sk;
    // 构建上传策略函数
    // function uptoken(bucket, key) {
    //   let putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key);
    //   return putPolicy.token();
    // }
    return {

    };
  });
}
