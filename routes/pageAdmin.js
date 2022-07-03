const express = require("express");
const router = express.Router();

router.get("/pageAdmin" ,(req, res, next)=>{
     user = req.session.currentUser
    res.render("userAdmin/userAdmin" , {user})    

})

module.exports = router;