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
          enum: ["Using", "Stored", "Lost", "stock"],
          required: [true, "Status is required"],
      },
      storageName: {
          type: String,
          ref: "Storage"
      },
      setId: {
        type: [String]
      },
      userId: {
        type: [Schema.Types.ObjectId],
        ref: "User"
    },
  }
  );  
  const BrickCategory = model('BrickCategory', brickCategorySchema);
  
  module.exports = BrickCategory;