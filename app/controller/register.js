
module.exports = app => {
  class LoginController extends app.Controller {
    async login() {
      const { ctx, app } = this;
      const createRule = {
        userName: { type: 'string' },
        password: { type: 'string' }
      };
      const body = ctx.request.body;
      const errors = app.validator.validate(createRule, body);
      if (errors) {
        ctx.body = ctx.helper.error({
          data: errors,
          msg: '数据校验失败'
        });
        return;
      }
      this.logger.info(JSON.stringify(body));
      const data = await ctx.model.User.findOne({ userName: ctx.request.body.userName }, '-_id userName password userId');
      if (data) {
        if (data.password === body.password.trim()) {
          const userInfo = JSON.parse(JSON.stringify(data));
          delete userInfo.password;
          const token = app.jwt.sign(userInfo, app.config.jwt.secret, { expiresIn: '1h' });
          ctx.body = ctx.helper.succeed({ data: token });
        }
      } else {
        ctx.body = ctx.helper.error({ msg: '用户不存在' });
        return;
      }
    }
    async createNewUser() {
      const { ctx, service } = this;
      const createRule = {
        userName: { type: 'string' },
        password: { type: 'string' }
      };
      const body = ctx.request.body;
      const errors = app.validator.validate(createRule, body);
      if (errors) {
        ctx.body = ctx.helper.error({
          data: errors,
          msg: '数据校验失败'
        });
        return;
      }
      const userData = await service.user.isUserNameExist(body.userName.trim());
      if (userData) {
        ctx.body = ctx.helper.error({
          msg: '用户已存在'
        });
        return;
      }
      const cryptPwd = ctx.helper.bcryptHashSync(body.password.trim());
      ctx.body = ctx.helper.succeed({ data: cryptPwd });
    }
  }
  return LoginController;
};
