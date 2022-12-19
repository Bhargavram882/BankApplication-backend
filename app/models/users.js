const mongoose=require("mongoose");
const usersschema=new mongoose.Schema({
    balance:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true   
    },
    acc:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true   
    }
})

module.exports=mongoose.model('usercoll',usersschema);