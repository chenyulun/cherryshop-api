module.exports = app => {
  app.get('/', 'index.index');
  app.get('/add', 'index.add');
  app.get('/remove', 'index.remove');
  app.get('/setsess', 'index.setSession');
  app.get('/getsess', 'index.getSession');
  app.get('/removesess', 'index.removeSession');
  app.post('/user', 'user.index');
};
