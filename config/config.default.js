module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1508918526786_9364';

  // add your config here
  config.middleware = [];
  // add domainWhiteList
  config.security = {
    domainWhiteList: [ '.baidu.com' ]
  };
  // add mongoose
  config.mongoose = {
    url: 'mongodb://127.0.0.1/cherryshop',
    options: {}
  };

  return config;
};
