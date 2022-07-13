const express = require('express');
const router = express.Router();
const Storage = require('../models/Storage');
const Brick = require("../models/Brick");
const fileUploader = require('../config/cloudinary.config');

router.get("/storage", async(req, res, next) => {
    const user = req.session.currentUser;

    try {
        //  db.brickmanagerdb.dropIndexes()
        const storage = await Storage.find({userId:user._id})  ;
        res.render("storage/storage" , {storage, user}) 
    } catch (err) {
        next(err);
    }
});

router.get("/:id/edit", async(req, res, next) => {
    const{ id } =req.params

    try{
         const storage = await Storage.findById(id) 
         
            const bricks = await Brick.find({}) 
            // quan recuperem l'array de bricks abans de mostrarlos farem un brick.filter(brick=> brick.status !== 'Stored' )
            // console.log(id , brick[0])
            
        res.render("storage/edit-storage" ,{storage,bricks} );
    }   
    catch(err){
        next (err)
    }    
});
router.post("/:id/edit", async(req, res, next) => {    
    const { id } = req.params;
    const {boxname, picture,bricks } = req.body;
    try {
         
        await Storage.findByIdAndUpdate(id, {boxname, picture , bricks} );         
       
        res.redirect(`/storage/${id}/storagedetails`);
        return
    } catch (error) {
        console.error("ERROR!!!", error);
        res.redirect(`/storage/${id}/edit`);
    }
});
router.get("/:id/deleteBricks", async(req, res, next) => {
    const{ id } =req.params

    try{
         const storage = await Storage.findById(id)
            const brick = await Brick.find({storageName:id}).populate("brickCategoryId")           
        res.render("storage/deleteBricks" ,{storage,brick} );
    }   
    catch(err){
        next (err)
    }    
});

router.post("/:id/deleteBricks", async(req, res, next) => {
      const { id } = req.params;
    const {bricks } = req.body;
    try {
        console.log({storageName:id})
        await Brick.findOneAndDelete({storageName:id}),{new:true};         
       
        res.redirect(`/storage/storage`);
        return
    } catch (error) {
        console.error("ERROR!!!", error);
        res.redirect(`/storage/storage`);
    }

});
router.get('/:id/storagedetails', async (req, res, next) => {
    const user = req.session.currentUser
    const {id} =req.params
    try{ 
      const storage = await Storage.findById(id)
      const bricks = await Brick.find({storageName: id}).populate("brickCategoryId")
// console.log(storage)
      res.render("storage/details",{storage, bricks, user}) 
  }
  catch(err) { 
      next(err)
  }
})

router.get('/create', async (req, res, next) => {
    try{
        const bricks =await Brick.find({});
        res.render("storage/new-storage", bricks);
    } catch(e){

        console.log(e)
    }
})

router.post("/create",  async(req, res, next) => {
    const {boxname, picture, bricks } =req.body
    try{
        const user = req.session.currentUser._id;
        await Storage.create({
            boxname, picture,bricks, userId: user
        })
          res.redirect("/storage/storage");
    }
    catch(err){
        console.error(err);
    }
  
});

router.post("/:id/delete", async(req, res, next) => {
   
    const { id } = req.params;
    try {
        await Storage.findByIdAndDelete(id);
          
        res.redirect("/storage/storage");
    } catch (error) {
        next(error);
    }
});

module.exports = router