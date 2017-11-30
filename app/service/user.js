const Service = require('egg').Service;
class User extends Service {
  async isUserNameExist(userName) {
    const user = await this.ctx.model.User.findOne({ userName }, '-_id userName password userId');
    return user;
  }
}
module.exports = User;
