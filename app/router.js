module.exports = app => {
  app.get('/', 'index.index');
  app.get('/user', 'user.index');
};
