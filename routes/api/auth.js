const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
//Item Model
const User=require('../../models/User');
const config=require('config');
const jwt=require('jsonwebtoken');
const auth=require('../../middleware/auth');

//@route POST api/auth
//@desc Authenticate Login Existing User
//@access Public 
/*
POST:localhost:5000/api/users
Headers
KEY:Content-Type
Value:application/json
Body(raw)
{
	"email":"c@email.com",
	"password":"c"
}
*/

router.post('/',(req,res)=>{
  const {email,password}=req.body;

  //Simple validation
  if(!email || !password){
      return res.status(400).json({msg:'Please enter all field'});  
  }

  //Check for existing user
  User.findOne({email})
    .then(user=>{
      if(!user) return res.status(400).json({msg:'User Do not exists'});

      //Copare password with password from hash
      bcrypt.compare(password,user.password)
        .then(isMatch=>{
          if(!isMatch) return res.status(400).json({msg:'Invalid credential'});

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
        })
      
    });
});

//@route GET api/auth/user
//@desc Get user data, keep check token and show user who is loggin in by name, id, email but not password 
//@access Private
/*
GET:localhost:5000/api/user
Headers
KEY:Content-Type
Value:application/json
KEY:x-auth-token
Value:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMjE3NTYwZTE0NWY3MTNiMWEwZjVjMiIsImlhdCI6MTU2MjQ3NDM1MywiZXhwIjoxNTYyNDc3OTUzfQ.jnzzp84wN7bAJCEYEPi06i8eNW_IENI6Gew4aw0paJY

*/


router.get('/user',auth,(req,res)=>{
  User.findById(req.user.id)
    .select('-password')
    .then(user=>res.json(user));
});

module.exports = router;
