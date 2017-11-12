/*
 *  user model
 *  
 */ 

module.exports = app => {
  // get mongoose from the app instance
  const mongoose = app.mongoose;
  // create a mongodb Schema
  const UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    password: { type: String },
  });

  return mongoose.model('User', UserSchema);
}