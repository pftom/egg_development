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
    image: { type: String, default: '/public/nodejs.png' },
    createdAt: { type: Date, default: Date.now },
    headLine: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
  });

  return mongoose.model('Events', EventsSchema);
}