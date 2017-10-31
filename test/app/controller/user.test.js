
const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should POST /user', () => {
    return app.httpRequest()
      .post('/user')
      .type('form')
      .send({
        userName: 'chenyulun'
      })
      .expect({
        resCode: '000000',
        resMsg: '请求成功',
        data: {
          userName: 'chenyulun',
          password: '123456',
          userId: 1
        }
      })
      .expect(200);
  });
});
