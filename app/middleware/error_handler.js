/**
 * Created by EX_WLJR_CHENYULUN on 2017/11/8.
 */

module.exports = () => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
      // 框架会统一监听，并打印对应的错误日志
      ctx.app.emit('error', err, this);
      // 自定义错误时异常返回的格式
      ctx.body = {
        resCode: '100000',
        message: ctx.app.config.env === 'prod' ? 'Internal Server Error' : err.message
      };
    }
  };
};
