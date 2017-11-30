module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1508918526786_9364';

  // add your config here
  config.middleware = [ 'reqJson', 'errorHandler', 'notfoundHandler' ]; // ,   'reqJwt','notfoundHandler', 'saveSession'
  // config.errorHandler = {
  //   match: '/user'
  // };
  // add domainWhiteList
  config.reqJwt = {
    secret: '123456',
    enable: true,
    match: '/user'
  };
  config.security = {
    csrf: false,
    domainWhiteList: [ '.baidu.com' ]
  };
  // add mongoose
  config.mongoose = {
    url: 'mongodb://127.0.0.1/cherryshop',
    options: {}
  };
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0
    }
  };
  // config.session = {
  //   key: 'SESSION_ID',
  //   maxAge: 'session', // 前端为当前会话有效
  //   maxAgeRides: 24 * 60 * 60 * 1000,
  //   httpOnly: true,
  //   encrypt: true
  // };
  config.jwt = {
    secret: '123456',
    enable: true,
    match: '/user'
  };
  // config.onerror = {
  //   all(err, ctx) {
  //     // 在此处定义针对所有响应类型的错误处理方法
  //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //     this.body = 'error';
  //     this.status = 500;
  //   },
  //   json(err, ctx) {
  //     // json hander
  //     this.body = { message: 'error' };
  //     this.status = 500;
  //   }
  // };
  // config.onerror = {
  //   all(err, ctx) {
  //     // 在此处定义针对所有响应类型的错误处理方法
  //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //     this.body = 'error';
  //     this.status = 500;
  //   },
  //   html(err, ctx) {
  //     // html hander
  //     this.body = '<h3>error</h3>';
  //     this.status = 500;
  //   },
  //   json(err, ctx) {
  //     // json hander
  //     ctx.logger.info(ctx.status);
  //     this.body = { message: 'error' };
  //     this.status = 500;
  //   },
  //   jsonp(err, ctx) {
  //     // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
  //   }
  // };

  return config;
};
