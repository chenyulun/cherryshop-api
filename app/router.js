module.exports = app => {
  app.get('/', 'index.index');
  app.post('/user', 'user.index');
};
