const mongoose=require("mongoose");
const transschema=new mongoose.Schema({
    t_id:{
        type:String,
        required:true
    },
    acc:{
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
    },
    from:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('transcoll',transschema);
