module.exports = app => {
  class User extends app.Service {
    async isUserNameExist(userName) {
      const user = await this.ctx.model.User.findOne({ userName }, '-_id userName password userId');
      return user;
    }
  }
  return User;
};
