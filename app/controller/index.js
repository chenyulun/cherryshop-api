module.exports = app => {
  class HomeController extends app.Controller {
    async index(ctx) {
      // ctx.body = 'hi, egg';
      ctx.body = `
      <form method="POST" action="/upload" enctype="multipart/form-data">
  title: <input name="title" />
  file: <input name="file" type="file"  multiple/>
  <button type="submit">上传</button>
</form>
      `;
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
    async testError(ctx) {
      ctx.throw(401, 'No authentication token found\n');
    }

  }
  return HomeController;
};
