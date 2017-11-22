/**
 * Created by EX_WLJR_CHENYULUN on 2017/10/31.
 */
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
  succeed(data) {
    const succeedData = {
      resCode: '000000',
      resMsg: data.msg || '请求成功'
    };
    if (data.data !== undefined) {
      succeedData.data = data.data;
    }
    return succeedData;
  },
  error(data) {
    const errorData = {
      resCode: '100000',
      resMsg: data.msg || '请求失败'
    };
    if (data.data !== undefined) {
      errorData.data = data.data;
    }
    return errorData;
  },
  bcryptHashSync(data) {
    return bcrypt.hashSync(data, saltRounds);
  },
  bcryptCompareSync(data, hash) {
    return bcrypt.compareSync(data, hash);
  },
};
