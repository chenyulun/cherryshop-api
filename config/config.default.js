module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1508918526786_9364';

  // add your config here
  config.middleware = [ 'reqJson', 'errorHandler', 'notfoundHandler' ];
  // config.errorHandler = {
  //   match: '/user'
  // };
  // add domainWhiteList
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
      password: 'auth',
      db: 0
    }
  };

  return config;
};
