const express = require("express");
const router = express.Router();
const User = require('../models/User');
const fileUploader = require('../config/cloudinary.config');


router.get("/pageAdmin" ,(req, res, next)=>{
     user = req.session.currentUser
    res.render("userAdmin/userAdmin" , {user})    

})



module.exports = router;