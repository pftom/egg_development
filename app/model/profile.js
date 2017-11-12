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
    identity: { type: String, default: '共青团员' },
    college: { type: String, default: '计算机学院' },
    major: { type: String },
    studentId: { type: String},
    userId: { type: String },
    createdAt: { type: Date, default: Date.now },
  });

  return mongoose.model('Profile', ProfileSchema);
}