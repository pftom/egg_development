'use strict';

module.exports = app => {
  // register logic
  app.post('/user/register', app.controller.user.register);
  app.post('/user/login', app.controller.user.login);
  app.post('/user/changePassword', app.controller.user.changePassword);
  app.get('/user', app.controller.user.getAllUser);
  app.get('/user/:id', app.controller.user.getUser);
  // events logic
  app.resources('events', '/home/events', 'events');
  
  // news logic
  app.resources('news', '/home/news', 'news');

};
