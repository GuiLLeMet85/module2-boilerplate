
const {Schema, model} = requiere('mongoose');

const brickSchema = new Schema(
{
    BrickCategoryId: {
        type: Schema.Types.ObjectId,
        required: [true, 'BrickCategoryId name is required.'],
        ref: "BrickCategory"
    },
    Quantity: {
        type: Number,
        required: [true, 'Quantity stock is required.'],
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["Using", "Stored", "Lost"],
        required: [true, "Status is required"],
    },
    storageName: {
        type: String,
        ref: "Storage"
    },

});




