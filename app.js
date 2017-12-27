/**
 * Created by EX_WLJR_CHENYULUN on 2017/11/1.
 */
// const qiniu = require('./lib/qiniu');
module.exports = app => {
  app.beforeStart(function* () {
    // 应用会等待这个函数执行完成才启动
    app.logger.info('app启动');
    // app.cities = yield app.curl('http://example.com/city.json', {
    //   method: 'GET',
    //   dataType: 'json'
    // });
  });
  // app.config.coreMiddleware.unshift('errorHandler');
  app.validator.addRule('jsonString', (rule, value) => {
    try {
      JSON.parse(value);
    } catch (err) {
      return 'must be json string';
    }
  });
  // qiniu(app);
  // set redis session store
  // session store must have 3 methods
  // define sessionStore in `app.js` so you can access `app.redis`
  app.sessionStore = {
    async get(key) {
      const res = await app.redis.get(key);
      if (!res) return null;
      return JSON.parse(res);
    },

    async set(key, value, maxAge) {
      // maxAge not present means session cookies
      // we can't exactly know the maxAge and just set an appropriate value like one day
      if (!maxAge || maxAge === 'session') maxAge = app.config.session.maxAgeRides || 24 * 60 * 60 * 1000;
      value = JSON.stringify(value);
      await app.redis.set(key, value, 'PX', maxAge);
    },

    async destroy(key) {
      await app.redis.del(key);
    }
  };
};
