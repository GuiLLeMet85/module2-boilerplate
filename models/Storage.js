const { Schema, model } = require('mongoose');

const storageSchema = new Schema( 
    {
      boxname: {
        type: String,
        trim: true,
        required: [true, 'Storage name is required.'],
        unique: true
      },
      brickCategoryId: {
        type: [Schema.Types.ObjectId],
        ref: "BrickCategory"
      },
      picture: {
        type: String,
        default: "/pictures/bricks-img/default-storage.jpg"      
      }    
    }
  );
  const Storage = model('Storage', userSchema);

  module.exports = Storage;