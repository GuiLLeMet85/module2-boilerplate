const express = require('express');
const router = express.Router();
const session = require('express-session');
const isLoggedIn = require('../middlewares');
const User = require('../models/User');
const fileUploader = require('../config/cloudinary.config');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// @desc    Displays form view to sign up
// @route   GET /auth/signup
// @access  Public
router.get('/signup', async (req, res, next) => {
  res.render('auth/signup');
})
// @desc    Displays form view to log in
// @route   GET /auth/login
// @access  Public
router.get('/login', async (req, res, next) => {    
  res.render('auth/login');
})
// @desc    Sends user auth data to database to create a new user
// @route   POST /auth/signup
// @access  Public
router.post('/signup', fileUploader.single('imageUrl'), async (req, res, next) => {
    const { email, password, username, existingImageSign } = req.body;
    // Validations
    if (!email || !password || !username) {
      res.render('auth/signup', { error: 'All fields are mandatory, please fill them before submiting' })
      return;
    }
  
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImageSign;
    }


     //requisitos password carácteres
     const regPass =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
     //si password cumple las condiciones de regex... test() devuelve true o false 
     if(!regPass.test(password)){
           res.render("auth/signup", {error: 'The password field must have uppercase, lowercase, numbers and a special character'})         
           return
     }
    try{           
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt) //encriptamos el password con el metodo hash 
        const user = await User.create({username, email, profilePicture, hashedPassword})// Creamos el usuario encriptado       
        res.render("index")        
    }   
    catch{
        res.render("auth/signup")
    }
})
// @desc    Sends user auth data to database to authenticate user
// @route   POST /auth/login
// @access  Public
router.post("/login" , async(req,res,next)=>{
    const {email, password} =req.body
     if(!email || !password){
         res.render("auth/login", {error: 'Fields cannot be empty'})
         return
     }    
    try{
        const user = await User.findOne({email:email})       
        //si el usuario no se encuentra en la db
        if(!user){
            res.render("auth/login", {error: "Data not found"})
            return
        }else{
            //comparamos el campo de password introducido, con el password hasheado de la base de datos => (user.codeHash)           
            const passCompare =  bcrypt.compare(password, user.hashedPassword)//devuleve true o false
            // console.log(password)
            // console.log(user.codeHash)
            // console.log(passCompare)
            if(passCompare){
                 req.session.currentUser = user
                 res.render("userAdmin/userAdmin",{user})
            }else{
                res.render("auth/login", {error: "Data not found"})
                return
            }            
        }       
    }   
    catch{
        res.render("auth/login")
    }
})
router.get("/:id/update" , async (req, res, next)=>{
    const user = req.session.currentUser
    try {
        const userFromDB = await User.findById(user._id)
        res.render('user/edit-user', { userFromDB, user })
    } catch (error) {
        next(error)
    }

})


router.post("/:id/update", fileUploader.single('imageUrl'), async (req, res, next) => {
    const {id} =req.params
    const {username, email, password, existingImage} = req.body

    let imageUrl;
    if (req.file) {
        imageUrl = req.file.path;
    } else {
        imageUrl = existingImage;
    }
   
    // User.findByIdAndUpdate(id, { username, email, password, existingImage}, { new: true })
    //   .then(() => res.redirect(`/`))
    //   .catch(error => console.log(`Error while updating a single movie: ${error}`));


    //    if(!username ||!email || !existingImage ){
    //       const user = await User.findById(id)
    //      res.render("auth/update", {id, error: 'Fields cannot be empty'})
    //      return
    //  } 
    //   const regEmail =/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    //  //si email cumple las condiciones de regex
    //  if(!regEmail.test(email)){
    //        res.render("auth/update", {error: 'The Email is not valid'})
    //        return
    //  }     
    try{ 
      const userEdit =await User.findByIdAndUpdate(id, {username, email, imageUrl}, { new: true })
      req.session.currentUser = userEdit
      res.render("index")
   }
   catch(err) {
    next(err)
}   
 })

 
router.post("/logout" ,(req, res,next)=>{
    req.session.destroy((err)=>{
        if(err){
            next(err)
        }else{
            res.redirect("/")
        }
    })})
router.post("/:id/removeAccount",async (req, res, next)=>{
    const { id }=req.params
    try{
         await User.findByIdAndDelete(id,{new:true})         
       req.session.destroy()
            res.redirect("/")
    }
    catch(err){
        next(err)
    }
})
module.exports = router;
