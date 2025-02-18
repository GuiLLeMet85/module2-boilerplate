
const {Schema, model} = require('mongoose');

const brickSchema = new Schema(
{
    brickCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "BrickCategory"
    },
      brickCategoryName: {
           type: Schema.Types.ObjectId,
        ref: "BrickCategory"
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity stock is required.'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["Using", "Stored", "Lost"],
        required: [true, "Status is required"],
    },
    storageId: {
        type: Schema.Types.ObjectId,
        ref: "Storage"
    },
    storageName: {
        type: Schema.Types.ObjectId,
        ref: "Storage"
    },

});

  const Brick = model('Brick', brickSchema);  
  module.exports = Brick;

