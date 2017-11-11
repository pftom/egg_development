/*
 *  events model
 *  
 */ 

module.exports = app => {
  // get mongoose from the app instance
  const mongoose = app.mongoose;
  // create a mongodb Schema
  const EventsSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
  });

  return mongoose.model('Events', EventsSchema);
}