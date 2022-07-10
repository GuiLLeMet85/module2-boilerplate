const { Schema, model } = require('mongoose');

const storageSchema = new Schema( 
    {
      boxname: {
        type: String,
        trim: true,
        required: [true, 'Storage name is required.'],
        unique: true
      },
      picture: {
        type: String,
        default: "/pictures/bricks-img/default-storage.jpg"      
      }
    }
  );
  const Storage = model('Storage', storageSchema);

  module.exports = Storage;