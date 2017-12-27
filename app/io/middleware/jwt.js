const socketioJwt = require('socketio-jwt');
module.exports = () => {
  return async (ctx, next) => {
    // await next();
    // // ctx.throw(401, 'No authentication token found\n');
    const socket = ctx.socket;
    socketioJwt.authorize({
      secret: ctx.app.config.jwt.secret,
      handshake: true
    })(socket, async err => {
      socket.isSuccess = !err;
      process.nextTick(() => {
        if (!socket.isSuccess) {
          socket.emit('unauthorized', 'Authentication error');
          process.nextTick(() => {
            socket.disconnect(true);
          });
          return;
        }
        console.log(socket.decoded_token);
        socket.emit('authenticated', { id: '123456' });
      });
      // await next();
      // ctx.socket.emit('res', `connected succeed:${data}`);
    });
    await next();
  };
};
