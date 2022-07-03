const express = require("express");
const router = express.Router();

router.get("/pageGuest" ,  (req, res, next)=>{
   
    res.render("guest/pageGuest")    

})

module.exports = router;