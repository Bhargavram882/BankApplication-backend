const mongoose=require("mongoose");
const reqschema=new mongoose.Schema({
    by:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true   
    },
    to:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('reqcoll',reqschema);
