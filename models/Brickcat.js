const { Schema, model } = require('mongoose');

const brickCatSchema = new Schema(
    {
      brickCatname: {
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
        type: String   
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
          type: [String],
          required: [true, 'box ID is required.']
      }
  }
  );  
  const BrickCat = model('BrickCat', userSchema);
  
  module.exports = BrickCat;