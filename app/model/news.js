/*
 *  news model
 *  
 */ 

module.exports = app => {
  // get mongoose from the app instance
  const mongoose = app.mongoose;
  // create a mongodb Schema
  const NewsSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
  });

  return mongoose.model('News', NewsSchema);
}