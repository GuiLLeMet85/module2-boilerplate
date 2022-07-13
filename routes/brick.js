const express = require("express");
const router = express.Router();
const User = require('../models/User');
const BrickCategory = require("../models/BrickCategory");
const Brick = require("../models/Brick");
const Storage = require('../models/Storage');
const session = require('express-session');
const Handlebars = require("hbs");

Handlebars.registerHelper('ifEquals', function(arg1, arg2) {
    return arg1 == arg2;
});

router.get("/list", async(req, res, next) => {

    try {
        const  user = req.session.currentUser;
        const brick = await Brick.find({userId: user._id}).populate("brickCategoryId storageId")
        
        res.render("bricks/list" , { brick , user })
    } catch (err) {
        next(err);
    }
});


router.get("/create-brick", async(req, res, next) => {
    const user = req.session.currentUser;
    try{
        const brickCategoriesFromDB =await BrickCategory.find({});
        const storagesFromDB =await  Storage.find({userId:user._id});
        res.render("bricks/create-brick", {brickCategoriesFromDB, storagesFromDB});
    } catch(e){
        console.log(e)
    }
});

router.post('/create-brick',  async (req, res, next) => {  

        const {brickCategoryId, quantity, status, storageName}=req.body

    try{
   const user =req.session.currentUser._id;
    const brick = await Brick.create({brickCategoryId, quantity, status, userId: user, storageName});
    res.redirect('/brick/list');
 }
    catch(e){  
    console.log(e)
    }
});

router.get("/:id/edit", async(req, res, next) => {
    const user = req.session.currentUser;
    const { id } = req.params;
    try {
        const brick = await Brick.findById(id).populate("brickCategoryId"); //removed storageId
        console.log(brick)
        res.render("bricks/update-form",{brick, user});
    } catch (error) {
        next(error);
    }
});

router.post("/:id/edit", async(req, res, next) => {
    
    const { id } = req.params;
    const { quantity, status } = req.body;
    const intQuantity = parseInt(quantity);
    try { 
       const updatedbrick = await Brick.findByIdAndUpdate(
            id, { quantity: intQuantity, status }, { new: true }
        );
        console.log(updatedbrick)
        res.redirect('/brick/list');
    } catch (error) {
        console.error("ERROR!!!", error);
        res.redirect(`/brick/${id}/edit`);
    }
});




router.post("/:id/delete", async(req, res, next) => {
   
    const { id } = req.params;
    try {
        await Brick.findByIdAndDelete(id);
        res.redirect(`/brick/list`);
    } catch (error) {
        next(error);
    }
});


router.get('/:id/details-brick', async (req, res, next) => {
    const user = req.session.currentUser;
    const { id } = req.params;
    
    try{ 
        const brickpart = await Brick.findById(id).populate("brickCategoryId");
        res.render("bricks/details-brick",{brickpart, user})     
  }
  catch(err) { 
      next(err)
      console.error("ERROR!!!", error);
  }
})

module.exports = router;