'use strict';

module.exports = app => {
  // register logic
  app.post('/user/register', app.controller.user.register);
  app.post('/user/login', app.controller.user.login);
  app.post('/user/changePassword', app.controller.user.changePassword);
  app.get('/user', app.controller.user.getAllUser);
  app.get('/user/:id', app.controller.user.getUser);
  app.delete('/user/:id', app.controller.user.deleteUser);

  // user profile logic
  // notice: no delete api
  app.post('/user/profile/new', app.controller.profile.addProfile);
  app.post('/user/profile', app.controller.profile.getProfile);
  app.post('/user/profile/edit', app.controller.profile.editProfile);

  // events logic
  app.resources('events', '/home/events', 'events');
  
  // news logic
  app.resources('news', '/home/news', 'news');

};
