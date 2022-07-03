const express = require("express");
const router = express.Router();

router.get("/pageAdmin" ,(req, res, next)=>{
    res.render("userAdmin/userAdmin" , {user})    

})

module.exports = router;