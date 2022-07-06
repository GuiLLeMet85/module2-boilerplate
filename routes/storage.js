const express = require('express');
const router = express.Router();
const Storage = require('../models/Storage');

const Brick = require("../models/BrickCategory");
router.get("/storage", async(req, res, next) => {

    try {
        const storage = await Storage.find({})  ;
        res.render("storage/storage" , {storage})
    } catch (err) {
        next(err);
    }
});
router.get("/:id/edit", async(req, res, next) => {
    const{ id } =req.params
    try{
         const storage = await Storage.findById(id).populate("bricks")   
            const brick = await Brick.find({})        
        res.render("storage/edit-storage" ,{storage,brick} );
    }   
    catch(err){
        next (err)
    }    
});
router.post("/:id/edit", async(req, res, next) => {    
    const { id } = req.params;
    const {boxname, picture,brick } = req.body;
    try {
        const storage = await Storage.findByIdAndUpdate(
            id, {boxname, picture , brick}, { new: true }
        );
        res.redirect('/storage/storage');
        return
    } catch (error) {
        console.error("ERROR!!!", error);
        res.redirect(`/storage/${id}/edit`);
    }
});
router.get("/create", (req, res, next) => {
    res.render("storage/new-storage");
});
router.post("/create", async(req, res, next) => {
    const {boxname, picture } =req.body
    try{
            await Storage.create({
                boxname, picture
            })
          res.redirect("/storage/storage");
    }
    catch(err){
        console.error("ERROR!!!", error);
    }
  
});


router.post("/:id/delete", async(req, res, next) => {
   
    const { id } = req.params;
     req.session.currentUser = user
    try {
        await Storage.findByIdAndDelete(id);
          
        res.redirect("/storage/storage",user);
    } catch (error) {
        next(error);
    }
});

module.exports = router