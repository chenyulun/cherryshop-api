module.exports = app => {
  app.get('/', 'index.index');
  app.post('/login', 'login.index');
  app.get('/testError', 'index.testError');
  app.get('/add', 'index.add');
  app.get('/remove', 'index.remove');
  // app.get('/setsess', 'index.setSession');
  // app.get('/getsess', 'index.getSession');
  // app.get('/removesess', 'index.removeSession');
  app.post('/user', 'user.index');
  app.post('/register/createNewUser', 'register.createNewUser');
  app.get('/user/userInfo', 'user.userInfo');
  app.post('/upload', 'uploader.upload');
};
