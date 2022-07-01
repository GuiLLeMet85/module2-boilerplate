require('dotenv').config();
const mongoose = require('mongoose');
const BrickCategory = require('../models/BrickCategory');

const brickCategory = [
    { brickCategoryName: "STICK Ø 3.2 W. HOLDER", brickCategoryLegoId: "6339183", quantity: 2, picture: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/6339183.jpg", color: "white", status: "stock", storageId: "1"},
    { brickCategoryName: "FOOT, PLATE", brickCategoryLegoId: "6093479", quantity: 1, picture: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/6093479.jpg", color: "white", status: "stock", storageId: "1"},
    { brickCategoryName: "ANGLE PLATE 1X2 / 2X2", brickCategoryLegoId: "6117940", quantity: 1, picture: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/6117940.jpg", color: "white", status: "stock ", storageId: "1"},
    { brickCategoryName: "PLATE 1X2 WITH SLIDE", brickCategoryLegoId: "4249563", quantity: 3, picture: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4249563.jpg", color: "white ", status: "stock", storageId: "1"},
    { brickCategoryName: "PLATES W. BOWS 2X2", brickCategoryLegoId: "4494474", quantity: 2, picture: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4494474.jpg", color: "white", status: "stock", storageId: "1"},
    { brickCategoryName: "PLATE 2X3", brickCategoryLegoId: "302101", quantity: 2, picture: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/302101.jpg", color: "white", status: "stock", storageId: "1"},
    { brickCategoryName: "BRICK 1X4 W. 4 KNOBS", brickCategoryLegoId: "4143254", quantity: 3, picture: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4143254.jpg", color: "white", status: "stock", storageId: "1"},
    { brickCategoryName: "BRICK 2X4", brickCategoryLegoId: "300101", quantity: 2, picture: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/300101.jpg", color: "white", status: "stock", storageId: "2"},
    { brickCategoryName: "TECHNIC 15M BEAM", brickCategoryLegoId: "4542578", quantity: 2, picture: "https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/4542578.jpg", color: "white", status: "stock", storageId: "4"},
];

//     { brickCategoryName: " ", brickCategoryLegoId: "", quantity: , picture: " ", color: "", status: "", storageId: ""},


const MONGO_URL = process.env.MONGODB_URL

  mongoose
    .connect(MONGO_URL)
    .then(x => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .then(() => {
      return BrickCategory.create(brickCategory);
    })
     .catch(err => {
    console.log(`An error occurred while getting bricks from the DB: ${err}`);
    })
    .finally(() => {
      mongoose.disconnect();
    });