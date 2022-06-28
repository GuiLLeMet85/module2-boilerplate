const { Schema, model } = require('mongoose');

const storageSchema = new Schema(
    {
      boxname: {
        type: String,
        trim: true,
        required: [true, 'Storage name is required.'],
        unique: true
      },
      brickId: {
          type: String
      },
      picture: {
        type: String   
      }    
    }
  );
  const Storage = model('Storage', userSchema);

  module.exports = Storage;