'use strict';

module.exports = app => {
  // register logic
  app.post('/users/register', app.controller.user.register);
  app.post('/users/login', app.controller.user.login);
  app.post('/users/changePassword', app.controller.user.changePassword);
  app.get('/users', app.controller.user.getAllUser);
  app.get('/users/:id', app.controller.user.getUser);
  app.delete('/users/:id', app.controller.user.deleteUser);

  // user profile logic
  // notice: no delete api
  app.post('/users/profile/new', app.controller.profile.addProfile);
  app.post('/users/profile', app.controller.profile.getProfile);
  app.post('/users/profile/edit', app.controller.profile.editProfile);

  // events logic
  app.resources('events', '/home/events', 'events');
  
  // news logic
  app.resources('news', '/home/news', 'news');

};
