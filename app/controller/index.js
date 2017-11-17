module.exports = app => {
  class HomeController extends app.Controller {
    async index() {
      this.ctx.body = 'hi, egg';
    }
    async add(ctx) {
      let count = ctx.cookies.get('count');
      count = count ? Number(count) : 0;
      ctx.cookies.set('count', ++count);
      ctx.body = count;
    }
    async remove(ctx) {
      ctx.cookies.set('count', null);
      ctx.status = 204;
    }
    async setSession(ctx) {
      let n = ctx.session.views || 0;
      ctx.session.views = ++n;
      this.logger.info(ctx.session.views);
      ctx.body = await ctx.session.views + ' views';
    }
    async getSession(ctx) {
      const res = await this.app.redis.get('fLPghNP_wVpFq4RcA-F4gMQceP75V91F');
      this.logger.info(res);
      ctx.body = res;
    }
    async removeSession(ctx) {
      ctx.session = null;
      ctx.body = 'removeSession';
    }

  }
  return HomeController;
};
