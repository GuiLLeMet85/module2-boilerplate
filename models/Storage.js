const { Schema, model } = require('mongoose');

const storageSchema = new Schema( 
    {
      boxname: {
        type: String,
        trim: true,
      },
      picture: {
        type: String,
        default: "/pictures/default-storage.jpg"      
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  );
  const Storage = model('Storage', storageSchema);

  module.exports = Storage;