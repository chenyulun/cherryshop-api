module.exports = () => {
  return async (ctx, next) => {
    // ctx.throw(401, 'No authentication token found\n');
    // ctx.socket.emit('res', 'connected!');
    // console.log(ctx.socket.handshake);
    await next();
    // execute when disconnect.
    console.log('disconnection!');
  };
};
