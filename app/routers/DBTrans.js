const express=require("express");
const router=express.Router();
const usercoll=require("../models/users");
const verifytoken=require("./middleware/verifytoken");

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://vikram:vikram123@cluster0.uszdr.mongodb.net/Bank?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));
async function register(){
 
}
router.patch("/",verifytoken, async (req, res) =>{
   const fobj=req.body.from;
   const tobj=req.body.to;
   const f=req.body.f;
   const t=req.body.t;
   
console.log(f,t,"hrello");
    try {
        const session = await conn.startSession();     
                                     
        await session.withTransaction(async () => { 
    
             user = await usercoll.findOne({ acc:f}).session(session);
            // console.log(user)
           console.log(user.balance) 
             if(user.balance != null){
                user.balance = fobj
                console.log(user.balance)
                user.markModified('balance');
            }
                
            const updatedStudent = await user.save();
             u = await usercoll.findOne({ acc:t}).session(session);
            if(u.balance != null){
                u.balance = tobj
                u.markModified('balance');
            }
                
            const update = await u.save();
        });
        res.sendStatus(200)
        console.log('success');

        session.endSession();
       
    } catch (error) {
        console.log(error);
    }
})

module.exports=router;
