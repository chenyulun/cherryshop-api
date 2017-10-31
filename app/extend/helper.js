/**
 * Created by EX_WLJR_CHENYULUN on 2017/10/31.
 */
module.exports = {
  succeed(data) {
    return {
      resCode: '000000',
      resMsg: '请求成功',
      data
    };
  },
  error(data) {
    return {
      resCode: '100000',
      resMsg: '请求失败',
      data
    };
  }
};
