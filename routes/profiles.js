const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares');
const User = require('../models/User');



router.get('/:id/userProfile', isLoggedIn, async (req, res, next) => {
    
     const { id }= req.params
    //  console.log(id)
    try{
        const user = await User.findById(id)
        // console.log(user)
        req.session.currentUser = user                
        res.render('profiles/userProfile', {user})
    }
    catch(err){
        next(err)
    }  
})
module.exports = router

