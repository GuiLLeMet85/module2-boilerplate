const { Schema, model } = require('mongoose');
 

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],  
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },    
      image:{
        type:String
    },
    usertype: {
        type: String,
        // requiered: true,
    },
    profilepicture: {
        type: String,
        // requiered: true,
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password is required.']
   }
  }
  ,
  {
    timestamps: true
  }
);
 
const User = model('User', userSchema);

module.exports = User;