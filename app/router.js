'use strict';

module.exports = app => {
  /*
   *  events logic
   *  
   */ 
  app.resources('events', '/home/events', 'events');
  
  /*
   *  news logic
   *  
   */ 
  app.resources('news', '/home/news', 'news');
};
