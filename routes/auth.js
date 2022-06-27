const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares');
const User = require('../models/User');
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
router.post("/signup" , async(req,res,next)=>{
    const {username, email,password} =req.body
    // si los campos user o pasword están vacios
     if(!username || !email || !password){
         res.render("auth/signup", {error: 'Fields cannot be empty'})
         return
     }
      const regex1 =/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
     //si email cumple las condiciones de regex
     if(!regex1.test(email)){
           res.render("auth/signup", {error: 'The Email is not valid'})
           return
     }
     //requisitos password carácteres
     const regex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
     //si password cumple las condiciones de regex... test() devuelve true o false 
     if(!regex.test(password)){
           res.render("auth/signup", {error: 'The password field must have uppercase, lowercase, numbers and a special character'})         
           return
     }
    try{
        const salt = await bcrypt.genSalt(saltRounds)
        const codeHash = await bcrypt.hash(password, salt) //encriptamos el password con el metodo hash 
        const user = await User.create({username, email, codeHash})// Creamos el usuario encriptado
        res.redirect("/")
    }   
    catch{
        res.render("auth/signup", {error: 'The username or email is already in use'})
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
            const passCompare =  bcrypt.compare(password, user.codeHash)//devuleve true o false
            console.log(password)
            console.log(user.codeHash)
            console.log(passCompare)
            if(passCompare){
                 req.session.currentUser = user
                 res.render("index",{user})
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

// @desc    Destroy user session and log out
// @route   POST /auth/logout
// @access  Private
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err)
    } else {
      res.redirect('/auth/login');
    }
  });
})

module.exports = router;
