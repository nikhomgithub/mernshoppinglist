const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
//Item Model
const User=require('../../models/User');
const config=require('config');
const jwt=require('jsonwebtoken');

//@route POST api/users
//@desc Register new user
//@access Public 
/*
POST:localhost:5000/api/users
Headers
KEY:Content-Type
Value:application/json
Body(raw)
{
	"name":"c",
	"email":"c@email.com",
	"password":"c"
}
*/

router.post('/',(req,res)=>{
  const {name,email,password}=req.body;
  //Simple validation
  if(!name || !email || !password){
      return res.status(400).json({msg:'Please enter all field'});  
  }

  //Check for existing user
  User.findOne({email})
    .then(user=>{
      if(user) return res.status(400).json({msg:'User already exists'});

      const newUser = new User({name,email,password});

       //Create salt & hash
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
          if(err) throw err;
          newUser.password=hash;
          newUser.save() //Do not save orginal password in DB
            .then(user=>{
              jwt.sign(
                {id:user.id}, //token=id+jwtScret+3600
                config.get('jwtSecret'),
                {expiresIn:3600},
                (err,token)=>{
                  if(err) throw err;
                  res.json({ //send back to client = token, user(id,name,email)
                    token,
                    user:{
                      id:user.id,
                      name:user.name,
                      email:user.email
                  }
                })
              })              
          });
      })
    }) 
      
    });

   




});

module.exports = router;
