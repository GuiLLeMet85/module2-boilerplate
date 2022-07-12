const express = require("express");
const router = express.Router();
const User = require('../models/User');
const BrickCategory = require("../models/BrickCategory");
const Brick = require("../models/Brick");
const Storage = require('../models/Storage');
const session = require('express-session');

router.get("/list", async(req, res, next) => {

    try {
      const  user = req.session.currentUser
        const brick = await Brick.find({}).populate("brickCategoryId")
        res.render("bricks/list" , { brick , user })
    } catch (err) {
        next(err);
    }
});

router.get("/create", (req, res, next) => {
    res.render("bricks/create-form");
});

router.get('/create-brick', async (req, res, next) => {
    try{
        const brickCategoriesFromDB =await BrickCategory.find({});
        const storagesFromDB =await  Storage.find({});
        res.render("bricks/create-brick", {brickCategoriesFromDB, storagesFromDB});
    } catch(e){
        console.log(e)
    }
})

router.post('/create-brick',  async (req, res, next) => {  

        const {brickCategoryId, quantity, status, storageName}=req.body
        console.log(brickCategoryId, quantity, status, storageName)
    try{
   
    const brick = await Brick.create({brickCategoryId, quantity, status, storageName});
    res.redirect('/brick/list');
 }
    catch(e){  
    console.log(e)
 }

})

router.post("/create", async(req, res, next) => {
    const { brickCategoryName, brickCategoryLegoId, quantity, picture, color, status } = req.body;
    const intBrickCategoryLegoId = parseInt(brickCategoryLegoId);
    const intQuantity = parseInt(quantity);
    let pictureTreated;
    if (picture !== "") {
        pictureTreated = picture;
    }

    try {
        await BrickCategory.create({
            brickCategoryName,
            brickCategoryLegoId: intBrickCategoryLegoId,
            //quantity: intQuantity,
            picture: pictureTreated,
            color: "red",
            status,
            //storageid i setid
        });
        res.redirect(`/brick/list`);
    } catch (error) {
        console.error("ERROR!!!", error);
        res.render("bricks/create-form");
    }
});
router.get("/:id/edit", async(req, res, next) => {
    const { id } = req.params;
    try {
        const brick = await Brick.findById(id).populate("brickCategoryId storageName");
        console.log(brick)
        res.render("bricks/update-form", brick);
    } catch (error) {
        next(error);
    }
});
router.post("/:id/edit", async(req, res, next) => {
    
    const { id } = req.params;
    const { brickCategoryName, brickCategoryLegoId, quantity, picture, color, status } = req.body;
    const intBrickCategoryLegoId = parseInt(brickCategoryLegoId);
    const intQuantity = parseInt(quantity);
    try {
        const updatedBrick = await BrickCategory.findByIdAndUpdate(
            id, { brickCategoryName, brickCategoryLegoId, quantity, picture, color, status }, { new: true }
        );
        console.log("Just updated:", updatedBrick);
        res.redirect('/brick/list');
    } catch (error) {
        console.error("ERROR!!!", error);
        res.redirect(`/brick/${id}/edit`);
    }
});
router.post("/:id/delete", async(req, res, next) => {
   
    const { id } = req.params;
    try {
        await BrickCategory.findByIdAndDelete(id);
        res.redirect(`/brick/list`);
    } catch (error) {
        next(error);
    }
});



router.get('/:id/details-brick', async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    
    try{ 
        const brickpart = await Brick.findById(id).populate("brickCategoryId");
        console.log(brickpart);
        res.render("bricks/details-brick",{brickpart})
        
  }
  catch(err) { 
      next(err)
  }
})









module.exports = router;