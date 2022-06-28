const mongoose = require('mongoose');
const BrickCat = require('../models/BrickCategory');

const brickcat = [
    { brickCatName: "STICK Ø 3.2 W. HOLDER", brickCatLegoId: "6339183", quantity: 2, picture: "pictures/bricks-img/6339183.jpg", color: "white", status: "stock", storageId: "1"},
    { brickCatName: "FOOT, PLATE", brickCatLegoId: "6093479", quantity: 1, picture: "pictures/bricks-img/6093479.jpg", color: "white", status: "stock", storageId: "1"},
    { brickCatName: "ANGLE PLATE 1X2 / 2X2", brickCatLegoId: "6117940", quantity: 1, picture: "pictures/bricks-img/6117940.jpg", color: "white", status: "stock ", storageId: "1"},
    { brickCatName: "PLATE 1X2 WITH SLIDE", brickCatLegoId: "4249563", quantity: 3, picture: "pictures/bricks-img/4249563.jpg", color: "white ", status: "stock", storageId: "1"},
    { brickCatName: "PLATES W. BOWS 2X2", brickCatLegoId: "4494474", quantity: 2, picture: "pictures/bricks-img/4249563.jpg", color: "white", status: "stock", storageId: "1"},
    { brickCatName: "PLATE 2X3", brickCatLegoId: "302101", quantity: 2, picture: "pictures/bricks-img/302101.jpg", color: "white", status: "stock", storageId: "1"},
    { brickCatName: "BRICK 1X4 W. 4 KNOBS", brickCatLegoId: "4143254", quantity: 3, picture: "pictures/bricks-img/4143254.jpg", color: "white", status: "stock", storageId: "1"},
    { brickCatName: "BRICK 2X4", brickCatLegoId: "300101", quantity: 2, picture: "pictures/bricks-img/300101.jpg", color: "white", status: "stock", storageId: "2"},
    { brickCatName: "TECHNIC 15M BEAM", brickCatLegoId: "4542578", quantity: 2, picture: "pictures/bricks-img/4542578.jpg", color: "white", status: "stock", storageId: "4"},
];

//     { brickCatName: " ", brickCatLegoId: "", quantity: , picture: " ", color: "", status: "", storageId: ""},




// const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

const MONGO_URI = process.env.MONGODB_URI 

  mongoose
    .connect(MONGO_URI)
    .then((x) => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    });
    
    .then()
    BrickCat.create(brickcat)
      .then(brickcatFromDB => {
        console.log(`Created bricks`);
     
    mongoose.connection.close(() => console.log("Disconnected from the db"));
  })

  .catch(err =>
    console.log(`An error occurred while getting bricks from the DB: ${err}`)
  );

 
