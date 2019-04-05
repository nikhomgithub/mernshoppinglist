const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path=require('path');

const app=express();

//Bodyparser Middleware
app.use(express.json());

//DB Config
const db=require('./config/keys').mongoURI;

//Connect to Mong
mongoose
  .connect(db,{
     useNewUrlParser:true,
     useCreateIndex:true 
  })
  .then(()=>console.log('MongoDB connected'))
  .catch(err=>console.log(err));

//Use Routes
app.use('/api/items', require('./routes/api/items'));

//Serve static assets if in production
if(process.env.NODE_ENV==='production'){
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

const port=process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server on port ${port}`));

