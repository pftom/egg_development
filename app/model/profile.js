/*
 *  user model
 *  
 */ 

module.exports = app => {
  // get mongoose from the app instance
  const mongoose = app.mongoose;
  // create a mongodb Schema
  const ProfileSchema = new mongoose.Schema({
    name: { type: String },
    sex: { type: String },
    identity: { type: String },
    college: { type: String },
    major: { type: String },
    studentId: { type: String},
    userId: { type: String },
    createdAt: { type: Date, default: Date.now },
  });

  return mongoose.model('Profile', ProfileSchema);
}