module.exports = () => {
  return async (ctx, next) => {
    if (ctx.socket.isSuccess) {
      ctx.socket.emit('res', 'packet received!');
      console.log('packet:', ctx.packet);
      await next();
    } else {
      ctx.socket.emit('unauthorized', 'Authentication error');
      throw (new Error('Authentication error'));
    }
  };
};
