const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares');
const User = require('../models/storage');

router.get('/storage', async (req, res, next) => {
    res.render('auth/storage');
  })


  
  router.post("/storage" , async(req,res,next)=>{
    const {    boxname,  brickCategoryId,  picture} =req.body  
    try{   
        res.render("auth/login", )
        return   
     }                       
    catch{
        res.render("auth/login")
    }
})


  



  