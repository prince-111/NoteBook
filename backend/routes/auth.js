const express = require('express');
const User = require('../models/User');
const router = express.Router() // importing Express Router
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'princeisagoodb$oy';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name', 'Enter the valid name').isLength({min:3}),
    body('email', 'Enter the valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),

], async(req,res)=>{
    // obj={
    //     a:'thios',
    //     number:23
    // }
    // res.json(obj)
    
    
    // console.log(req.body);
    // const user = User(req.body);
    //  // by user.save to save db
    //   user.save()
    //  res.send(req.body);

    let success = false;
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // check whether the user with this email exists already.
  try{

    let user = await User.findOne({email: req.body.email});
    //  console.log(user)
    if(user){
       return res.status(400).json({success, error: "Sorry a user with this email aready exists"})
    }
    
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    // Create a new user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        //  password: req.body.password,
        
      });
        // .then(user => res.json(user))
        // .catch(err=> console.log(err))
        // res.json({error:'Please enter a uniques values for email', message: err.message})


    //  res.send(req.body);


     // res.send("hello");
    //  res.json({"Nice":"nice"})

    const data={
      user:{
        id:user.id
      }
    }
    // const jwtData = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);
       
      const authtoken = jwt.sign(data,JWT_SECRET);

    // res.json(user) 
    success = true;
    res.json({ success, authtoken})

    // catch errors
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});



// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success=false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success=false;
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success=false;
      return res.status(400).json({success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id,
        role: user.role
      }
    }
    // const authtoken = jwt.sign(data, JWT_SECRET);
    const auth = {"authtoken": jwt.sign(data,JWT_SECRET),
       "role": data.user.role
    };
    success=true;
    res.json({success, auth })
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

});



// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async(req, res)=>{
 try{
  userId = req.user.id; // Getting the user-id
  const user = await User.findById(userId).select("-password")
  res.send(user) // Sending the user, as response
 }
 catch(error){
  res.status(500).send("Internal Server Error");
 }
})
module.exports = router