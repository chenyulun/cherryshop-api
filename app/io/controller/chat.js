module.exports = app => {
  class Controller extends app.Controller {
    async ping() {
      const message = this.ctx.args[0];
      await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
    }
    async disconnect() {
      const message = this.ctx.args[0];
      console.log('disconnect:' + message);
    }
    async connection(a, b) {
      console.log('hello! ', this.ctx.socket.decoded_token.name);
    }
  }
  return Controller;
};
