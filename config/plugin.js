// had enabled by egg
// exports.static = true;
const config = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  session: {
    enable: false
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  io: {
    enable: true,
    package: 'egg-socket.io'
  }
  // qiniu: {
  //   enable: true,
  //   package: 'egg-qiniu'
  // }
};
Object.assign(exports, config);

