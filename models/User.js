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
    userIsAdmin: {
      type: Boolean,
      default: false,
      required: [true, 'Is required.']
    },    
    usertype: {
        type: String,
        // requiered: true,
    },
    imageUrl: {
        type: String,
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