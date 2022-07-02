const { Schema, model } = require('mongoose');

const brickCategorySchema = new Schema(
    {
      brickCategoryName: {
        type: String,
        trim: true,
        required: [true, 'brick name is required.'],
        unique: true
      },
      brickCategoryLegoId: {
        type: String,
        unique: true
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
      },
      picture: {
        type: String,
        default: "/pictures/default-brick.png"   
      },
      color: {
         type: String,
         required: [true, 'Color is required.'], 
      },
      status: {
          type: String,
          required: [true, 'Status is required.']
      },
      storageId: {
          type: [Schema.Types.ObjectId],
          ref: "Storage"
      },
      setId: {
        type: [String]
    }
  }
  );  
  const BrickCategory = model('BrickCategory', brickCategorySchema);
  
  module.exports = BrickCategory;