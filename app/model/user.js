/**
 * Created by EX_WLJR_CHENYULUN on 2017/10/25.
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    userName: { type: String },
    userId: {
      type: Number
    },
    password: { type: String }
  });

  return mongoose.model('User', UserSchema);
};
