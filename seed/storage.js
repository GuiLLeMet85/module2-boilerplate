require('dotenv').config();
const mongoose = require('mongoose');
const Storage = require('../models/Storage');

const storage = [
    { boxname: "Box A", picture: "https://m.media-amazon.com/images/I/51m5htTsG9L._AC_SY450_.jpg"},
    { boxname: "Box B", picture: "https://m.media-amazon.com/images/I/51qM3FzC6FL._AC_SY450_.jpg"},
    { boxname: "Box C", picture: "https://m.media-amazon.com/images/I/81+leGYdbgL._AC_SX425_.jpg"},
    { boxname: "Box D", picture: "https://m.media-amazon.com/images/I/51Fjuh1ldNL._AC_SX425_.jpg"}
];

//     { boxname: " ", brickId: "", quantity: , picture: " ", color: "", status: "", storageId: ""},

const MONGO_URL = process.env.MONGO_URL
  mongoose
    .connect(MONGO_URL)
    .then(x => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .then(() => {
      return Storage.create(storage);
    })
     .catch(err => {
    console.log(`An error occurred while getting bricks from the DB: ${err}`);
    })
    .finally(() => {
      mongoose.disconnect(); 
    });