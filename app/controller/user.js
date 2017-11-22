module.exports = app => {
  class UserController extends app.Controller {
    async index() {
      const { ctx, app } = this;
      const createRule = {
        userName: { type: 'string' }
      };
      const errors = app.validator.validate(createRule, ctx.request.body);
      if (errors) {
        ctx.body = ctx.helper.error(errors);
        return;
      }
      this.logger.info(JSON.stringify(ctx.request.body));
      const data = await ctx.model.User.findOne({ userId: ctx.request.body.userId }, '-_id userName password userId');
      ctx.body = ctx.helper.succeed({ data });
    }
    async userInfo() {
      const { ctx } = this;
      this.logger.info(JSON.stringify(ctx.state.user));
      const userInfo = ctx.state.user;
      const data = await ctx.model.User.findOne({ userId: userInfo.userId }, '-_id userName userId');
      ctx.body = ctx.helper.succeed({ data });
    }
  }
  return UserController;
};
