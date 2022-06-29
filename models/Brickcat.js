const { Schema, model } = require('mongoose');

const brickCategorySchema = new Schema(
    {
      brickCatName: {
        type: String,
        trim: true,
        required: [true, 'brick name is required.'],
        unique: true
      },
      brickCatLegoId: {
        type: String,
        unique: true
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
      },
      picture: {
        type: String,
        default: "/pictures/bricks-img/image.jpg"   
      },
      color: {
         type: String,
         required: [true, 'Color is required.'], 
      },
      status: {
          type: String,
          required: [true, 'Color is required.']
      },
      storageId: {
          type: [Schema.Types.ObjectId],
          required: [true, 'box ID is required.'] //
      },
      setId: {
        type: [String]
    }
  }
  );  
  const BrickCategory = model('BrickCategory', userSchema);
  
  module.exports = BrickCat;