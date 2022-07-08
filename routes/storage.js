const express = require('express');
const router = express.Router();
const Storage = require('../models/Storage');

const Brick = require("../models/Brick");
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
         
            const bricks = await Brick.find({}) 
            console.log(brick)
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
router.get("/:id/deleteBrickInStorage", async(req, res, next) => {
    const{ id } =req.params

    try{
         const storage = await Storage.findById(id).populate("bricks")   
         
            const brick = await Brick.findOne({}) 
            
        res.render("storage/deleteBrickInStorage" ,{storage,brick} );
    }   
    catch(err){
        next (err)
    }    
});


router.post("/:id/deleteBrickInStorage", async(req, res, next) => {
      const { id } = req.params;
    const {bricks } = req.body;
    try {
         
        await Storage.findByIdAndDelete(id, {bricks} );         
       
        res.redirect(`/storage/${id}/storagedetails`);
        return
    } catch (error) {
        console.error("ERROR!!!", error);
        res.redirect(`/storage/${id}/edit`);
    }

});



router.get('/:id/storagedetails', async (req, res, next) => {
    const {id} =req.params
    try{ 
      const storage = await Storage.findById(id).populate("bricks")
// console.log(storage)
      res.render("storage/details",storage)
  }
  catch(err) { 
      next(err)
  }
})



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
    try {
        await Storage.findByIdAndDelete(id);
          
        res.redirect("/storage/storage");
    } catch (error) {
        next(error);
    }
});

module.exports = router