const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');

//Item Model
const Item=require('../../models/Item');

//@route GET api/items
//@desc Get All Items
//@access Public 
/*
GET:localhost:5000/api/items
Headers
KEY:Content-Type
Value:application/json
*/

router.get('/',(req,res)=>{
  Item.find()
    .sort({date:-1})
    .then(items=>res.json(items))

});

//@route POST api/items
//@desc Create an Item
//@access Private
/*
POST:localhost:5000/api/items
Headers
KEY:Content-Type
Value:application/json

KEY:x-auth-token
Value:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMjE3NTYwZTE0NWY3MTNiMWEwZjVjMiIsImlhdCI6MTU2MjQ3NDM1MywiZXhwIjoxNTYyNDc3OTUzfQ.jnzzp84wN7bAJCEYEPi06i8eNW_IENI6Gew4aw0paJY
*/
router.post('/',auth,(req,res)=>{
  const newItem=new Item({
    name:req.body.name
  });

  newItem
    .save()
    .then(item=>res.json(item));
});

//@route Delete api/items/id
//@desc Delete an Item
//@access Private
/*
DELETE:localhost:5000/api/items/5d217bcd9c0cf21617bf8aa0
Headers
KEY:Content-Type
Value:application/json

KEY:x-auth-token
Value:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMjE3NTYwZTE0NWY3MTNiMWEwZjVjMiIsImlhdCI6MTU2MjQ3NDM1MywiZXhwIjoxNTYyNDc3OTUzfQ.jnzzp84wN7bAJCEYEPi06i8eNW_IENI6Gew4aw0paJY
*/
router.delete('/:id',auth,(req,res)=>{
    Item.findById(req.params.id)
      .then(item=>item.remove().then(()=>res.json({success:true})))
      .catch(err=>res.status(404).json({success:false}));
});

module.exports = router;

/*
Header
key:Content-Type
value:application/json

key:x-auth-token
value: token.....


*/
