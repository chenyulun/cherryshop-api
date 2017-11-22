/**
 * Created by EX_WLJR_CHENYULUN on 2017/11/8.
 */

module.exports = () => {
  return async function(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      ctx.logger.info('ddd %s', ctx.acceptJSON);
      if (ctx.acceptJSON) ctx.body = ctx.helper.error({ msg: '请求未定义' });
      else ctx.body = '<h1>Page Not Found</h1>';
    }
  };
};
