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
      this.logger.info(ctx.req.body);
      const data = await ctx.model.User.findOne({ userName: ctx.request.body.userName }, '-_id userName password userId');
      ctx.body = ctx.helper.succeed(data);
    }
  }
  return UserController;
};
