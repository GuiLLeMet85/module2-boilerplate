const express = require('express');
const router = express.Router();
const Storage = require('../models/Storage.js');

router.get('/storages', async (req, res, next) => {
    
     const { id }= req.params
    //  console.log(id)
    try{
        const storage = await Storage.findById(id)
        // console.log(user)        
        res.render('storage/storages', storage)
    }
    catch(err){
        next(err)
    }  
})
module.exports = router