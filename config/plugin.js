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
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  }
};
Object.assign(exports, config);

